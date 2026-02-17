## Live SQL embeds (CodeAPI / SQL-Workbench)

You can embed interactive SQL examples using the SQL Workbench and CodeAPI. The site already loads the required scripts in the theme header. Example embedding using the LiveCodes wrapper:

<div id="mysql-playground"></div>

<script>
LiveCodes.embed({
  target: '#mysql-playground',
  config: {
    template: 'sql',
    sqlEngine: 'mysql'
  },
  code: `SELECT * FROM users WHERE id = 1;`,
  /* If you want the demo to pre-load example data, point to a JSON/CSV fixture using `dataUrl`.
     The repository includes a small JSON fixture at `src/static/users.json`, which will be available
     under /static/users.json in the built site. */
  dataUrl: '/static/users.json',
  options: {
    height: '320px',
    layout: { editor: true, result: true }
  }
});
</script>

Notes:
- This runs entirely in the browser (no Jupyter server required).
- Replace `code` with the SQL you want learners to edit and run.
- For production, prefer loading SQL demo data via remote endpoints or prepackaged JSON fixtures.
