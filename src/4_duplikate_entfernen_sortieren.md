# Duplikate entfernen und sortieren
```sql
CREATE TABLE kunden (
    kundenNr   int NOT NULL,
    name       varchar(30),
    vorname    varchar(20),
    geschlecht varchar(1),
    PRIMARY KEY (kundenNr)
);
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
INSERT INTO kunden VALUES 
(232, 'Schneider', 'Heinrich', 'm'),
(233, 'Schlauch', 'Franz', 'm'),
(234, 'Schlauch', 'Franziska', 'w'),
(235, 'Böckle', 'Jennifer', 'w'),
(236, 'Hauffe', 'Johann', 'm'),
(237, 'Yilmaz', 'Ali', 'm'),
(238, 'Berger', 'Johann', 'm');
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


## Doppelte Ergebnisse entfernen


Die Geschlechter der Kunden können mit der folgenden Abfrage angezeigt
werden.

```sql
SELECT geschlecht
FROM Kunden;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


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



## Abfrageergebnisse sortieren

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


