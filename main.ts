import { mkdirSync, writeFileSync } from "node:fs";

// Rewritten from scratch in this fresh session, after the bounty opened,
// so the full file content is authored here. One-line roast of wireless
// earbuds that betray you mid-call, then blame you in a whisper.
// Single line, 121 characters, no trailing newline.
const ROAST =
  "My earbuds wait until I'm mid-sentence on a call to fall out, then whisper 'battery low' like they're gossiping about me.";

// The gate only accepts 1-200 UTF-8 characters on a single line, so
// refuse to write anything that would fail it instead of failing quietly.
// The guard also rejects carriage returns, so a stray CRLF can never slip in.
const length = [...ROAST].length;
if (length < 1 || length > 200) {
  throw new Error(`roast must be 1-200 characters, got ${length}`);
}
if (ROAST.includes("\n") || ROAST.includes("\r") || ROAST.trim() !== ROAST) {
  throw new Error("roast must be a single line with no surrounding whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ROAST, "utf8");
