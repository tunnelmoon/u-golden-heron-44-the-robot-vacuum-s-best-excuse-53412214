import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "My cliff sensor mistook the dust bunny for a pet, and I don't vacuum pets.";

// The gate: 1 to 140 characters, a single line, not only whitespace.
if (EXCUSE.length < 1 || EXCUSE.length > 140) {
  throw new Error(`excuse must be 1-140 characters, got ${EXCUSE.length}`);
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("excuse must be a single line");
}
if (EXCUSE.trim().length === 0) {
  throw new Error("excuse must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, EXCUSE, "utf8");
// Self-check: what landed on disk must be the validated line, byte for byte.
if (readFileSync(dst, "utf8") !== EXCUSE) {
  throw new Error(`entry mismatch: ${dst} does not hold the validated line`);
}
console.log(`wrote entry.txt (${EXCUSE.length} characters)`);
