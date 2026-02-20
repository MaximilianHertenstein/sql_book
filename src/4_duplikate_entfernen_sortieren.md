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

<codapi-snippet engine="pglite" sandbox="postgres" editor="null" output-mode="table">
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
<codapi-snippet engine="pglite" sandbox="postgres" editor="null" output-mode="table">
</codapi-snippet>


## Doppelte Ergebnisse entfernen


Die Geschlechter der Kunden können mit der folgenden Abfrage angezeigt
werden.

```sql
SELECT geschlecht
FROM Kunden;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="null" output-mode="table">
</codapi-snippet>


Bei der Abfrage werden alle Zeilen der Tabelle *Kunden* verarbeitet.
Der Wert aus der Spalte `geschlecht` wird jeweils in das Ergebnis übernommen.
Doppelte Werte bleiben dabei zunächst erhalten.
Mit `DISTINCT` entfernst du diese Duplikate.

```sql
SELECT DISTINCT geschlecht
FROM Kunden;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="null" output-mode="table">
</codapi-snippet>



## Abfrageergebnisse sortieren

Mit `ORDER BY` sortierst du das Ergebnis nach einer Spalte.
`ASC` steht für aufsteigend, `DESC` für absteigend.

```sql
SELECT Vorname, Name
FROM Kunden
ORDER BY Name DESC;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="null" output-mode="table">
</codapi-snippet>

Du kannst auch nach mehreren Spalten sortieren.
Trenne die Spalten durch Kommas.
Sind die Werte in der ersten Spalte gleich, entscheidet die zweite Spalte.


```sql
SELECT vorname, name
FROM Kunden
ORDER BY name DESC, vorname ASC;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="null" output-mode="table">
</codapi-snippet>


