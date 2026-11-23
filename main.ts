import { mkdirSync, writeFileSync } from "node:fs";

// Entry for the one-line roast bounty: a single original line about the
// wireless earbuds I reach for every day. They only ever slip out of my
// ear at the worst possible moment, and then they tattle on me in a
// whisper instead of just staying put.
const OUTPUT_PATH = "/output/entry.txt";
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function roastLine(): string {
  const fragments = [
    "My earbuds wait until I'm mid-sentence on a call to fall out,",
    "then whisper 'battery low' like they're gossiping about me.",
  ];
  return fragments.join(" ");
}

function countChars(text: string): number {
  return Array.from(text).length;
}

function assertSingleLine(text: string): void {
  const chars = countChars(text);
  if (chars < MIN_LENGTH || chars > MAX_LENGTH) {
    throw new Error(
      `roast must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${chars}`,
    );
  }
  const hasLineBreak = text.includes("\n") || text.includes("\r");
  const hasEdgeWhitespace = text.trim() !== text;
  if (hasLineBreak || hasEdgeWhitespace) {
    throw new Error("roast must be one line with no edge whitespace");
  }
}

function ensureOutputDir(): void {
  mkdirSync("/output", { recursive: true });
}

function main(): void {
  const line = roastLine();
  assertSingleLine(line);
  ensureOutputDir();
  writeFileSync(OUTPUT_PATH, line, "utf8");
}

main();
