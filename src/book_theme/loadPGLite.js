(async () => {
  try {
    const module = await import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.3.15/dist/index.js");
    const PGlite = module.PGlite || module.default || module;
    const db = new PGlite();

    window.codapi ||= {};
    window.codapi.engines ||= {};

    window.codapi.engines.pglite = {
      exec: async req => {
        try {
          const sql = req?.files?.[""] || "";
          const started = Date.now();
          const result = await db.query(sql, [], { rowMode: "array" });
          const fields = result?.fields || [];
          const rows = result?.rows || [];

          if (!fields.length) {
            return { ok: true, duration: Date.now() - started, stdout: [], stderr: "" };
          }

          const seen = new Map();
          const headers = fields.map(field => {
            const base = field?.name || "column";
            const count = (seen.get(base) || 0) + 1;
            seen.set(base, count);
            return count === 1 ? base : `${base}_${count}`;
          });

          const tableRows = rows.map(row =>
            Object.fromEntries(headers.map((name, index) => [name, row[index]])),
          );

          return { ok: true, duration: Date.now() - started, stdout: tableRows, stderr: "" };
        } catch (error) {
          return { ok: false, duration: 0, stdout: "", stderr: error?.toString?.() || String(error) };
        }
      },
    };
  } catch (error) {
    console.error("Failed to initialize PGlite engine", error);
  }
})();
