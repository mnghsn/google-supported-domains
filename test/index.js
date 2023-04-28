import t from "tap";
import googleSupportedDomains from "../src/index.js";

t.test("all()", async (t) => {
  const domains = googleSupportedDomains.all();
  const pattern = /^\.google\.[a-z.]+$/;

  for (const domain of domains) {
    t.equal(pattern.test(domain), true);
  }
});

t.test("test()", async (t) => {
  t.test("main domains", async (t) => {
    const expected = {
      "google.com": true,
      "google.co.jp": true,
      "example.com": false,
      "example.net": false,
    };

    for (const domain in expected) {
      t.equal(googleSupportedDomains.test(domain), expected[domain]);
    }
  });

  t.test("subdomains", async (t) => {
    const expected = {
      "mail.google.com": true,
      "drive.google.com": true,
      "foo.example.com": false,
      "bar.example.com": false,
    };

    for (const domain in expected) {
      t.equal(googleSupportedDomains.test(domain), expected[domain]);
    }
  });
});
