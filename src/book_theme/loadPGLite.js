(async () => {
  try {
    const module = await import(
      "https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.3.15/dist/index.js"
    );
    const PGlite = module.PGlite || module.default || module;
    const db = new PGlite();

    window.codapi ||= {};
    window.codapi.engines ||= {};

    window.codapi.engines.pglite = {
      exec: async req => {
        const sql = req?.files?.[""] || "";
        const started = Date.now();

        try {
          const result = await db.query(sql, [], { rowMode: "array" });
          const fields = result.fields || [];
          const rows = result.rows || [];

          if (!fields.length) {
            return { ok: true, duration: Date.now() - started, stdout: [], stderr: "" };
          }

          // Handle duplicate column names
          const seen = new Map();
          const headers = fields.map(f => {
            const name = f?.name || "column";
            const count = (seen.get(name) || 0) + 1;
            seen.set(name, count);
            return count === 1 ? name : `${name}_${count}`;
          });

          const tableRows = rows.map(row =>
            Object.fromEntries(headers.map((h, i) => [h, row[i]]))
          );

          return { ok: true, duration: Date.now() - started, stdout: tableRows, stderr: "" };
        } catch (err) {
          return { ok: false, duration: 0, stdout: "", stderr: String(err) };
        }
      }
    };
  } catch (err) {
    console.error("Failed to initialize PGlite engine", err);
  }
})();
