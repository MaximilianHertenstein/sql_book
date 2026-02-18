const dbReady = import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.3.15/dist/index.js")
  .then(m => new (m.PGlite || m.default || m)());

window.codapi ||= {};
window.codapi.engines ||= {};
window.codapi.engines.pglite = {
  exec: async req => {
    const started = Date.now();
    try {
      const db = await dbReady;
      const { fields = [], rows = [] } = await db.query(req?.files?.[""] || "", [], { rowMode: "array" });
      const seen = new Map();
      const headers = fields.map(f => {
        const n = f?.name || "column";
        const c = (seen.get(n) || 0) + 1;
        seen.set(n, c);
        return c === 1 ? n : `${n}_${c}`;
      });
      return { ok: true, duration: Date.now() - started, stdout: rows.map(r => Object.fromEntries(headers.map((h,i)=>[h,r[i]]))), stderr: "" };
    } catch (e) {
      return { ok: false, duration: 0, stdout: "", stderr: String(e) };
    }
  }
};
