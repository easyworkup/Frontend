const { readFileSync } = require("node:fs");
const { createHash } = require("node:crypto");
const assert = require("node:assert/strict");
const target = process.env.API_OPENAPI_URL || "api/openapi.json";
const manifest = process.env.API_OPENAPI_MANIFEST || "api/openapi-source.json";
const bytes = readFileSync(target);
const source = JSON.parse(readFileSync(manifest));
const spec = JSON.parse(bytes);
assert.equal(
  createHash("sha256").update(bytes).digest("hex"),
  source.sha256,
  "Contract checksum mismatch"
);
assert.match(source.sourceRevision, /^[a-f0-9]{40}$/);
assert.equal(source.dirty, false, "Publish a contract from a clean committed backend revision");
assert.equal(source.contractVersion, spec.info.version);
assert.ok(Object.keys(spec.paths).every((p) => p.startsWith("/api/")));
console.log(`Verified contract ${source.contractVersion} from backend ${source.sourceRevision}`);
