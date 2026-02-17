window.codapi ||= {};
window.codapi.engines ||= {};

window._pgliteReady = import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.3.15/dist/index.js")
  .then(m => new (m.PGlite || m.default || m)());

window.codapi.engines.pglite = {
  exec: async req => {
    const db = await window._pgliteReady;
    const sql = req?.files?.[""] || (typeof req === "string" ? req : "");
    const result = await db.query(sql);
    return { ok: true, stdout: JSON.stringify(result.rows), stderr: "", duration: 0 };
  },
};