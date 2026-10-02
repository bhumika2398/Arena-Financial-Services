"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "tf-preloader-shown";
// Used only when there is no video to wait on (reduced motion / video error).
const NO_VIDEO_DURATION_MS = 1800;
// finance_video_5.mp4 runs ~10.07s. The video's real "ended" event is the
// primary trigger; this is ONLY a safety net so a stalled/broken video can
// never trap users on the preloader. It must exceed the video length plus
// buffering time, otherwise it would cut the video short.
const SAFETY_TIMEOUT_MS = 14000;

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  // null = not yet decided (avoids a flash before sessionStorage is read),
  // true/false once we know whether to render it at all.
  const [shouldRender, setShouldRender] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // NOTE for local testing: this only ever shows once per browser TAB
  // session (sessionStorage persists across reloads in the same tab, by
  // design — that's the "once per session" requirement). To see it again
  // during dev, either open a new tab, or in devtools run
  // `sessionStorage.removeItem("tf-preloader-shown")` then reload.
  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      // sessionStorage unavailable (privacy mode etc.) — just show it once.
    }

    // TEMPORARY DEBUG LOGGING — remove once the video issue is confirmed
    // fixed. Open your browser's DevTools console (F12) when loading the
    // site to see these.
    console.log(
      "[Preloader] mount check — sessionStorage 'tf-preloader-shown' =",
      alreadyShown ? "true (WILL be suppressed, see below)" : "not set (WILL render)",
    );

    if (alreadyShown) {
      console.log(
        "[Preloader] SUPPRESSED: already shown in this browser tab this session. " +
          "To see it again, run in DevTools console: sessionStorage.removeItem('tf-preloader-shown') " +
          "then reload — or open a new tab.",
      );
      // Must run post-mount: sessionStorage is only readable client-side,
      // and the initial render has to stay SSR-safe (null → nothing shown).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(false);
      return;
    }

    console.log("[Preloader] rendering now.");
    setShouldRender(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Non-fatal — worst case the preloader replays once more.
    }

  }, []);

  // Safety net + no-video path. With a playing video, the 'ended' event
  // (see onEnded below) dismisses the preloader; this timer only fires if
  // that never happens.
  useEffect(() => {
    if (!shouldRender) return;
    const ms =
      prefersReducedMotion || videoFailed ? NO_VIDEO_DURATION_MS : SAFETY_TIMEOUT_MS;
    const timer = setTimeout(() => {
      console.warn("[Preloader] dismissing via timeout after", ms, "ms (video 'ended' did not fire)");
      setVisible(false);
    }, prefersReducedMotion ? 300 : ms);
    return () => clearTimeout(timer);
  }, [shouldRender, prefersReducedMotion, videoFailed]);

  // Belt-and-suspenders autoplay fix: the `autoPlay` HTML attribute can be
  // silently ignored by the browser (no `error` event fires at all — this
  // is the single most common reason a video "loads fine but never plays"
  // and is invisible to onError-based debugging) if the muted PROPERTY
  // isn't already true at the moment the browser evaluates autoplay
  // eligibility. Explicitly setting `.muted = true` and calling `.play()`
  // ourselves, and logging any rejection, surfaces this class of failure.
  useEffect(() => {
    if (!shouldRender || prefersReducedMotion || videoFailed) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const playPromise = el.play();
    if (playPromise) {
      playPromise
        .then(() => console.log("[Preloader video] el.play() resolved — playback started successfully"))
        .catch((err) => {
          console.error(
            "[Preloader video] el.play() REJECTED — this is likely the real bug. " +
              "Browser blocked autoplay. Error name:",
            err?.name,
            "message:",
            err?.message,
          );
        });
    }
  }, [shouldRender, prefersReducedMotion, videoFailed]);

  // Lock scroll while the preloader is up so the page can't be scrolled
  // underneath it during the reveal sequence.
  useEffect(() => {
    if (shouldRender && visible) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [shouldRender, visible]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.04 }
          }
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-deep-950"
        >
          {!prefersReducedMotion && !videoFailed ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              preload="auto"
              loop={false}
              playsInline
              onLoadStart={() => console.log("[Preloader video] loadstart — browser began fetching the file")}
              onCanPlay={() => console.log("[Preloader video] canplay — file loaded enough to play")}
              onLoadedData={() => console.log("[Preloader video] loadeddata — first frame decoded")}
              onWaiting={() => console.log("[Preloader video] waiting — buffering")}
              onEnded={() => {
                console.log("[Preloader video] ended — playback finished, revealing site");
                setVisible(false);
              }}
              onPlaying={() => console.log("[Preloader video] playing — actually rendering frames now")}
              onError={(e) => {
                // Log the REAL browser MediaError (code + message) so the
                // actual failure reason is visible, not just "it failed".
                const mediaError = e.currentTarget.error;
                console.error(
                  "[Preloader video] onError fired. MediaError code:",
                  mediaError?.code,
                  "(1=ABORTED, 2=NETWORK, 3=DECODE, 4=SRC_NOT_SUPPORTED)",
                  "message:",
                  mediaError?.message || "(no message provided by browser)",
                );
                // Explicit fallback: stop rendering the <video> element
                // entirely so there's no broken/blank video box — the
                // gradient scrim + corner glows + logo reveal below are a
                // complete preloader on their own (this is exactly what
                // reduced-motion users already see).
                setVideoFailed(true);
              }}
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/finance_video_5.mp4"
            />
          ) : null}

          {/* Dark gradient scrim so the logo stays legible over the video */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-deep-950/70 via-deep-950/50 to-deep-950/80"
          />

          {/* Ambient breathing glow, anchored to the corners */}
          <div
            aria-hidden
            className={
              prefersReducedMotion
                ? "absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary-600/25 blur-3xl"
                : "absolute -left-40 -top-40 h-96 w-96 animate-pulse-glow rounded-full bg-primary-600/25 blur-3xl"
            }
          />
          <div
            aria-hidden
            className={
              prefersReducedMotion
                ? "absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-sage-500/20 blur-3xl"
                : "absolute -bottom-40 -right-40 h-96 w-96 animate-pulse-glow rounded-full bg-sage-500/20 blur-3xl [animation-delay:1.5s]"
            }
          />

          <div className="relative flex flex-col items-center gap-5 px-6 text-center">
            <div
              className="flex items-center gap-4"
              role="img"
              aria-label="Arena Financial Services"
            >
              {/* Circular badge — fades/rotates in first */}
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 0.6, rotate: -60 }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.8,
                  ease: "easeOut",
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 p-2 shadow-[0_0_30px_rgba(6,133,98,0.35)] sm:h-20 sm:w-20"
              >
                <Image
                  src="/images/badge-256.png"
                  alt=""
                  aria-hidden="true"
                  width={256}
                  height={256}
                  priority
                  className="h-full w-full object-contain"
                />
              </motion.div>

              {/* Wordmark — slides in beside the badge once it has settled */}
              <motion.div
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -16 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.55,
                  ease: "easeOut",
                }}
                className="rounded-lg bg-white/95 px-2.5 py-1.5 shadow-sm"
              >
                <Image
                  src="/images/wordmark.png"
                  alt=""
                  aria-hidden="true"
                  width={230}
                  height={19}
                  priority
                  className="h-4 w-auto sm:h-5"
                />
              </motion.div>
            </div>

            {/* Animated underline that fills as the "load" progresses */}
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-mint/10 sm:w-56">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 1.5,
                  delay: prefersReducedMotion ? 0 : 0.9,
                  ease: "easeInOut",
                }}
                style={{ originX: 0 }}
                className="h-full w-full bg-gradient-to-r from-primary-500 to-sage-400"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0.1 : 1.5,
              }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-mint"
            >
              Loans. Simplified.
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
