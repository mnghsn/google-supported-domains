import * as fs from "node:fs/promises";
import prettier from "prettier";

const GOOGLE_SUPPORTED_DOMAINS_URL = "https://www.google.com/supported_domains";
const OUTPUT_PATH = new URL("../src/domains.js", import.meta.url).pathname;

async function main() {
  const response = await fetch(GOOGLE_SUPPORTED_DOMAINS_URL);
  const body = await response.text();
  const domains = body.trim().split("\n").sort();
  const json = JSON.stringify(domains);
  const js = `export const domains = ${json}`;

  const config = await prettier.resolveConfig(import.meta.url);
  const output = await prettier.format(js, { parser: "babel", ...config });

  await fs.writeFile(OUTPUT_PATH, output, "utf8");
}

main();
