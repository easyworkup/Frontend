const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const Module = require("node:module");
// Load actual generated TypeScript, without a second test framework or a dev server.
require.extensions[".ts"] = (module, filename) => {
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  module._compile(output.outputText, filename);
};
process.env.NEXT_PUBLIC_API_URL = "https://api.example.test/api";
const { apiFetch, ApiError } = require("../src/shared/api/fetcher.ts");
const resumes = require("../src/shared/api/generated/client/resumes/resumes.ts");
const { registerBody } = require("../src/shared/api/generated/zod/auth/auth.ts");

test("generated request uses one /api prefix, JSON, auth headers, credentials and abort signal", async (t) => {
  const controller = new AbortController();
  let request;
  const original = global.fetch;
  t.after(() => {
    global.fetch = original;
  });
  global.fetch = async (url, init) => {
    request = { url, init };
    return Response.json({ id: "resume-id", revision: 1 });
  };
  const body = { directionId: "10000000-0000-4000-8000-000000000001", title: "Resume" };
  const result = await resumes.createResume(body, {
    headers: {
      Authorization: "Bearer test-token",
      "Idempotency-Key": "10000000-0000-4000-8000-000000000002",
    },
    signal: controller.signal,
  });
  assert.equal(request.url, "https://api.example.test/api/resumes");
  assert.deepEqual(JSON.parse(request.init.body), body);
  assert.equal(request.init.headers.get("Authorization"), "Bearer test-token");
  assert.equal(request.init.headers.get("Idempotency-Key"), "10000000-0000-4000-8000-000000000002");
  assert.equal(request.init.headers.get("Content-Type"), "application/json");
  assert.equal(request.init.credentials, "include");
  assert.equal(request.init.signal, controller.signal);
  assert.deepEqual(result, { id: "resume-id", revision: 1 }, "no phantom status/data wrapper");
});

test("empty success, structured conflict, non-JSON failures and cancellation", async (t) => {
  const original = global.fetch;
  t.after(() => {
    global.fetch = original;
  });
  global.fetch = async () => new Response(null, { status: 204 });
  assert.equal(await apiFetch("/api/me"), undefined);
  const body = { error: { code: "CONFLICT", message: "Stale revision", requestId: "test" } };
  global.fetch = async () => Response.json(body, { status: 409 });
  await assert.rejects(
    apiFetch("/api/resumes/1"),
    (error) =>
      error instanceof ApiError && error.status === 409 && error.body.error.code === "CONFLICT"
  );
  global.fetch = async () => new Response("upstream unavailable", { status: 502 });
  await assert.rejects(
    apiFetch("/api/me"),
    (error) => error.status === 502 && error.body === "upstream unavailable"
  );
  global.fetch = async () => {
    throw new DOMException("Cancelled", "AbortError");
  };
  await assert.rejects(apiFetch("/api/me"), { name: "AbortError" });
});

test("generated validation rejects malformed registration", () => {
  const valid = {
    fullName: "Test User",
    email: "test@example.test",
    password: "test-password-123",
    acceptedTerms: true,
  };
  assert.equal(registerBody.safeParse(valid).success, true);
  assert.equal(registerBody.safeParse({ ...valid, email: "invalid" }).success, false);
  assert.equal(registerBody.safeParse({ ...valid, password: "short" }).success, false);
  assert.equal(registerBody.safeParse({ ...valid, acceptedTerms: false }).success, false);
});
