const dbReady = import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.3.15/dist/index.js")
  .then(m => new (m.PGlite ?? m.default ?? m)());

((window.codapi ??= {}).engines ??= {}).pglite = {
  exec: async ({ files } = {}) => {
    try {
      const db = await dbReady;
      const { fields = [], rows = [] } = await db.query(files?.[""] ?? "", [], { rowMode: "array" });
      const headers = fields.map((f, i) =>
        fields.findIndex(x => x?.name === f?.name) === i ? f.name ?? "column" : `${f.name ?? "column"}_${i}`
      );
      return { ok: true, duration: 0, stdout: rows.map(r => Object.fromEntries(headers.map((h, i) => [h, r[i]]))), stderr: "" };
    } catch (e) {
      return { ok: false, duration: 0, stdout: "", stderr: String(e) };
    }
  }
};