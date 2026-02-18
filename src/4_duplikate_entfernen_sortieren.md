# Doppelte Ergebnisse entfernen

Die Geschlechter der Kunden können mit der folgenden Abfrage angezeigt
werden.

```sql
SELECT geschlecht
FROM Kunden;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

        *\#* *geschlecht*
  ---------- --------------
           1 m
           2 m
           3 w
           4 w
           5 m
    $\vdots$ $\vdots$

\
Bei der Erzeugung der Ergebnistabelle werden alle Zeilen der Tabelle
*Kunden* durchlaufen. Für jede Zeile wird der Wert in der Spalte
`geschlecht` zum Ergebnis hinzugefügt. Dabei werden doppelte Ergebnisse
nicht automatisch entfernt. Dies ist mit dem Schlüsselwort
`DISTINCT` möglich.

```sql
SELECT DISTINCT geschlecht
FROM Kunden;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

    *\#* *geschlecht*
  ------ --------------
       1 m
       2 w

\

# Abfrageergebnisse sortieren

Abfrageergebnisse können auch nach den Werten in einer ausgewählten
Spalte sortiert werden. Hierfür schreibt man hinter die Schlüsselwörter
`ORDER BY` den Spaltennamen und `ASC` für eine aufsteigende
oder `DESC` für eine absteigende Sortierung.

```sql
SELECT Vorname, Name 
FROM Kunden
ORDER BY Name DESC;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

        *\#* *name*     *vorname*
  ---------- ---------- -----------
           1 Yilmaz     Ali
           2 Watzke     Bernd
    $\vdots$ $\vdots$   $\vdots$
          10 Schlauch   Rudolf
          11 Schlauch   Franziska
          12 Schlauch   Franz
          13 Schlauch   Angelika
    $\vdots$ $\vdots$   $\vdots$
          77 Alber      Rolf
          78 Albanesi   Dario

\
Es ist auch möglich, mehrere Spalten, nach denen sortiert werden soll,
mit der Reihenfolge anzugeben. Diese werden durch Kommas voneinander
getrennt. Wenn die Werte in der ersten angegeben Spalte gleich sind,
wird nach den Werten in der zweiten angegebenen Spalte sortiert.

```sql
SELECT vorname, name 
FROM Kunden
ORDER BY name DESC, vorname ASC;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

        *\#* *name*     *vorname*
  ---------- ---------- -----------
           1 Yilmaz     Ali
           2 Watzke     Bernd
    $\vdots$ $\vdots$   $\vdots$
          10 Schlauch   Angelika
          11 Schlauch   Franz
          12 Schlauch   Franziska
          13 Schlauch   Rudolf
    $\vdots$ $\vdots$   $\vdots$
          77 Alber      Rolf
          78 Albanesi   Dario

\
