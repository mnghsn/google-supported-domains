import t from "tap";
import { domains } from "../src/domains.js";

t.test("domains", async (t) => {
  for (const domain of domains) {
    t.equal(/^\.google\.[a-z.]+$/.test(domain), true);
  }
});
