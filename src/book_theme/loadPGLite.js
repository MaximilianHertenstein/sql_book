// Load PGlite once
window._pgliteReady = import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.3.15/dist/index.js")
  .then(m => new (m.PGlite || m.default || m)());

// Register the pglite engine
window.codapi ||= {};
window.codapi.engines ||= {};
window.codapi.engines.pglite = {
  exec: async req => {
    const db = await window._pgliteReady;
    const sql = req?.files?.[""] || (typeof req === "string" ? req : "");
    const rows = (await db.query(sql)).rows;
    return { ok: true, duration: 0, stdout: JSON.stringify(rows), stderr: "" };
  },
};
