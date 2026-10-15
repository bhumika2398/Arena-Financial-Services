import fs from "node:fs";
import path from "node:path";

/**
 * Loads content/legal/<slug>.txt and turns it into a structured document.
 * The .txt files stay the source of truth; every wording change applied on
 * the way in is listed in EDITS below so it is easy to audit.
 */

export type ListItem = { text: string; children?: ListItem[] };
export type Block =
  | { k: "clause"; num: string; text: string }
  | { k: "p"; text: string }
  | { k: "sub"; text: string }
  | { k: "list"; style: "alpha" | "roman" | "bullet" | "number"; items: ListItem[] }
  | { k: "table"; head: string[]; rows: string[][] }
  | { k: "kv"; lines: string[] };
export type Section = { id: string; num: string; title: string; blocks: Block[] };
export type LegalDoc = { title: string; lastUpdated: string | null; sections: Section[] };

/** Ordered text edits applied to the raw file (see summary for the audit list). */
const EDITS: [RegExp | string, string][] = [
  // Broken address: use the contact email already present in the document.
  ["grievances@Tiwari Capital.com", "response@tiwarifinserv.com"],
  // Terms 2: unbalanced quote around the company name.
  ["(‘Tiwari Financial Services, ‘we’ or ‘us’)", "(‘Arena Financial Services’, ‘we’ or ‘us’)"],
  // Terms 13.6/13.7: stray full stops after the company name, duplicated clause number.
  [/13\.6\s+13\.6/, "13.6"],
  ["Tiwari financial services., its", "Tiwari financial services, its"],
  ["Tiwari financial services.. The", "Tiwari financial services. The"],
  // Company name.
  [/Tiwari (Financial Services|Financial Solutions|Capital|financial services)/gi, "Arena Financial Services"],
  [/\bTCFS\b/g, "Arena Financial Services"],
  // Typos.
  ["situation at at", "situated at"],
  ["Rustom Bhag", "Rustam Bhag"],
  ["thereunde,", "thereunder,"],
  ["Regulation1 (Regulation", "Regulation (Regulation"],
];

function applyEdits(raw: string) {
  let s = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  for (const [from, to] of EDITS) {
    s = typeof from === "string" ? s.split(from).join(to) : s.replace(from, to);
  }
  return s;
}

const clean = (s: string) => s.replace(/\s+/g, " ").trim();
const isAllCaps = (s: string) => /[A-Z]/.test(s) && s === s.toUpperCase();
const sentenceCase = (s: string) => {
  const t = s.toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

function sectionTitle(raw: string) {
  const t = clean(raw);
  if (/^ACCEPTABLE USE Prohibited Uses$/.test(t)) return "Acceptable use — Prohibited uses";
  return isAllCaps(t) ? sentenceCase(t) : t;
}

function pushList(blocks: Block[], style: "alpha" | "roman" | "bullet" | "number", item: ListItem, child = false) {
  const last = blocks[blocks.length - 1];
  if (child && last?.k === "list") {
    const parent = last.items[last.items.length - 1];
    (parent.children ??= []).push(item);
    return;
  }
  if (last?.k === "list" && last.style === style) last.items.push(item);
  else blocks.push({ k: "list", style, items: [item] });
}

export function loadLegal(slug: "terms-of-use" | "privacy-policy"): LegalDoc {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "legal", `${slug}.txt`), "utf8");
  const lines = applyEdits(raw).split("\n");
  const isTerms = slug === "terms-of-use";
  const sections: Section[] = [];
  let cur: Section | null = null;
  let lastUpdated: string | null = null;

  const secRe = isTerms ? /^(\d+)\.\s+(\S.*)$/ : /^(\d+)\s+([A-Z][A-Z ,?']+)$/;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;

    const sm = trimmed.match(secRe);
    if (sm && !/^\d+\.\d/.test(trimmed) && isAllCaps(sm[2].split(/\s[A-Z][a-z]/)[0])) {
      cur = { id: `section-${sm[1]}`, num: sm[1], title: sectionTitle(sm[2]), blocks: [] };
      sections.push(cur);
      continue;
    }
    if (!cur) continue; // document title lines before the first section

    // Cookies table (Terms §14): 4 header cells + 4 cells per row, up to the closing paragraph.
    if (isTerms && trimmed === "Name of cookie") {
      const cells: string[] = [];
      let j = i;
      for (; j < lines.length; j++) {
        const t = lines[j].trim();
        if (t.startsWith("If you do not want to receive a cookie")) break;
        if (t) cells.push(clean(t));
      }
      const rows: string[][] = [];
      for (let c = 4; c < cells.length; c += 4) rows.push(cells.slice(c, c + 4));
      cur.blocks.push({ k: "table", head: cells.slice(0, 4), rows });
      i = j - 1;
      continue;
    }

    if (isTerms) {
      const cl = trimmed.match(/^(\d+\.\d+)\s+(.*)$/);
      if (cl) {
        const text = clean(cl[2]);
        const upd = text.match(/most recently updated on (.+?)\.?$/i);
        if (upd) lastUpdated = upd[1];
        cur.blocks.push({ k: "clause", num: cl[1], text });
        continue;
      }
      const ro = trimmed.match(/^(i{1,3}|iv)\.\s+(.*)$/);
      if (ro) {
        pushList(cur.blocks, "roman", { text: clean(ro[2]) }, true);
        continue;
      }
      const al = trimmed.match(/^([a-z])\.\s+(.*)$/);
      if (al) {
        const t = clean(al[2]);
        pushList(cur.blocks, "alpha", { text: isAllCaps(t.replace(/[;.]$/, "")) ? sentenceCase(t) : t });
        continue;
      }
      if (/^(Name|Address|E-mail):/.test(trimmed) || /^Address\s/.test(trimmed)) {
        const last = cur.blocks[cur.blocks.length - 1];
        if (last?.k === "kv") last.lines.push(clean(trimmed));
        else cur.blocks.push({ k: "kv", lines: [clean(trimmed)] });
        continue;
      }
      cur.blocks.push({ k: "p", text: clean(trimmed) });
      continue;
    }

    // Privacy policy
    if (trimmed.startsWith("•")) {
      pushList(cur.blocks, "bullet", { text: clean(trimmed.slice(1)) });
      continue;
    }
    if (/^\*\s+/.test(trimmed)) {
      pushList(cur.blocks, "bullet", { text: clean(trimmed.slice(1)) }, true);
      continue;
    }
    const nm = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (nm) {
      pushList(cur.blocks, "number", { text: clean(nm[2]) });
      continue;
    }
    if (trimmed.length <= 120 && !/[.;:,]$/.test(trimmed)) {
      cur.blocks.push({ k: "sub", text: clean(trimmed) });
      continue;
    }
    cur.blocks.push({ k: "p", text: clean(trimmed) });
  }

  return {
    title: isTerms ? "Terms of Use" : "Privacy Policy",
    lastUpdated,
    sections,
  };
}
