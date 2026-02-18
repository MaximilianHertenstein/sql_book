# Kapitel 2


```sql
select 1 = 1 as message;
```

<codapi-snippet sandbox="mysql" editor="basic">
</codapi-snippet>




```sql
select 1 = 1 as message;
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


```sql
select 1 = 1 as message;
```

<codapi-snippet engine="wasi" sandbox="sqlite">
</codapi-snippet>


```sql
CREATE TABLE  users (
  id INTEGER,
  name TEXT NOT NULL,
  email TEXT
);
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table" >
</codapi-snippet>

```sql
-- Insert sample data
INSERT INTO users   VALUES
(1, 'Alice', 'alice@example.com' ),
(2,'Bob', 'bob@example.com');
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table" >
</codapi-snippet>

```sql
select * FROM users;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table" >
</codapi-snippet>