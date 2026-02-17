# Kapitel 2


```sql
select 1 = 1 as message;
```

<codapi-snippet sandbox="mysql" editor="basic">
</codapi-snippet>




<pre><code>
create table data(message text);
insert into data values ('Hello, World!');
select * from data;
</code></pre>

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>