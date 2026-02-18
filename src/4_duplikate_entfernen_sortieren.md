
```sql
CREATE TABLE kunden (
    kundenNr   int NOT NULL,
    name       varchar(30),
    vorname    varchar(20),
    strasse    varchar(30),
    ortNr      int,
    geschlecht varchar(1),
    gebTag     date,
    PRIMARY KEY (kundenNr)
);
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
INSERT INTO kunden VALUES 
(232, 'Schneider', 'Heinrich', 'Goezstraße 25', 29740, 'm', '1985-06-16'),
(233, 'Schlauch', 'Franz', 'Ulmer Weg 56', 30050, 'm', '1993-08-23'),
(234, 'Schlauch', 'Franziska', 'Ulmer Weg 56', 30050, 'w', '2013-05-24'),
(235, 'Böckle', 'Jennifer', 'Hermann-Hesse-Str. 3', 11553, 'w', '2013-04-21'),
(236, 'Hauffe', 'Johann', 'Seestraße 21', 29003, 'm', '1997-07-31'),
(237, 'Yilmaz', 'Ali', 'Wehrstraße 87', 29315, 'm', '2011-03-13'),
(238, 'Berger', 'Johann', 'Vaihinger Str. 103', 29875, 'm', '2012-03-25');
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


# Doppelte Ergebnisse entfernen


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


