/**
 * Scrolls to an in-page section by id. Shared by the Navbar's own-page
 * click handling and the Home page's "arrived via #hash from elsewhere"
 * mount effect, so both routes to the same section behave identically.
 */
export function scrollToSection(id: string, reducedMotion: boolean) {
  const el = document.getElementById(id);
  if (!el) {
    console.error(
      "[scrollToSection] document.getElementById('" + id + "') returned NULL — the target element does not exist in the DOM right now.",
    );
    return;
  }
  const rect = el.getBoundingClientRect();
  console.log(
    "[scrollToSection] found element for id:",
    id,
    "— its top is",
    rect.top,
    "px from the current viewport top (this is BEFORE scrolling). Calling scrollIntoView now.",
  );
  el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}
