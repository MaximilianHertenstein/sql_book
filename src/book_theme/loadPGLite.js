// Load PGlite once
window._pgliteReady = import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.3.15/dist/index.js")
  .then(m => new (m.PGlite || m.default || m)());

// Register pglite engine
window.codapi ||= {};
window.codapi.engines ||= {};
window.codapi.engines.pglite = {
  exec: async req => {
    try {
      const db = await window._pgliteReady;
      const sqlFromFiles =
        req?.files && typeof req.files === "object"
          ? (req.files[""] ?? Object.values(req.files)[0])
          : undefined;
      const sql = sqlFromFiles ?? (typeof req === "string" ? req : "");

      if (!sql || !sql.trim()) {
        return { ok: true, duration: 0, stdout: "", stderr: "" };
      }

      const result = await db.query(sql, [], { rowMode: "array" });
      const fields = result?.fields ?? [];
      const rows = result?.rows ?? [];

      if (!fields.length) {
        const affected = typeof result?.affectedRows === "number" ? result.affectedRows : 0;
        return { ok: true, duration: 0, stdout: `OK (${affected})`, stderr: "" };
      }

      const nameCount = new Map();
      const headers = fields.map(field => {
        const baseName = field?.name || "column";
        const seen = (nameCount.get(baseName) || 0) + 1;
        nameCount.set(baseName, seen);
        return seen === 1 ? baseName : `${baseName}_${seen}`;
      });

      const formatValue = value => {
        if (value === null || value === undefined) return "NULL";
        if (typeof value === "object") return JSON.stringify(value);
        return String(value);
      };

      const textRows = rows.map(row => row.map(formatValue));
      const isNumeric = headers.map((_, col) =>
        textRows.length > 0 && textRows.every(r => /^-?\d+(\.\d+)?$/.test(r[col] ?? "")),
      );

      const widths = headers.map((header, col) => {
        const maxCell = textRows.reduce((max, row) => Math.max(max, (row[col] ?? "").length), 0);
        return Math.max(header.length, maxCell);
      });

      const drawLine = (left, middle, right) =>
        `${left}${widths.map(width => "─".repeat(width + 2)).join(middle)}${right}`;

      const drawRow = values =>
        `│ ${values
          .map((value, col) =>
            isNumeric[col] ? value.padStart(widths[col], " ") : value.padEnd(widths[col], " "),
          )
          .join(" │ ")} │`;

      const lines = [
        drawLine("┌", "┬", "┐"),
        drawRow(headers),
        drawLine("├", "┼", "┤"),
        ...textRows.map(drawRow),
        drawLine("└", "┴", "┘"),
        `(${textRows.length} rows)`,
      ];

      return { ok: true, duration: 0, stdout: lines.join("\n"), stderr: "" };
    } catch (error) {
      const message = error?.message || String(error);
      return { ok: false, duration: 0, stdout: "", stderr: message };
    }
  },
};
