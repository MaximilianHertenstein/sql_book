const dbReady = import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.3.15/dist/index.js")
  .then(m => new m.PGlite());

(window.codapi ??= {}).engines ??= {};
window.codapi.engines.pglite = {
  exec: async ({ files } = {}) => {
    try {
      const db = await dbReady;
      const sql = files?.[""] ?? "";

      const { fields, rows } = await db.query(sql, [], { rowMode: "array" });

      const seen = {};
      const headers = fields.map(f => {
        const count = seen[f.name] ?? 0;
        seen[f.name] = count + 1;
        return count === 0 ? f.name : `${f.name}_${count}`;
      });

      const stdout = rows.map(row =>
        Object.fromEntries(headers.map((h, i) => [h, row[i]]))
      );

      return { ok: true, duration: 0, stdout, stderr: "" };
    } catch (e) {
      return { ok: false, duration: 0, stdout: "", stderr: String(e) };
    }
  }
};