# Abfragen über mehrere Tabellen

```sql
CREATE TABLE fahrradarten (
    fahrradartNr     int NOT NULL,
    bezeichnung      varchar(50),
    PRIMARY KEY (fahrradartNr)
);
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
INSERT INTO fahrradarten VALUES
(1, 'Mountain-Bike'),
(2, 'Cross-Bike'),
(3, 'BMX-Bike'),
(4, 'DirtBike'),
(5, 'Einrad'),
(6, 'Tandem'),
(7, 'Kinderfahrrad ab 20 Zoll'),
(8, 'Jugendfahrrad'),
(9, 'Kinderrad Fahrrad 12-18 Zoll'),
(10, 'Jugendfahrrad ab 26 Zoll'),
(11, 'Rennrad'),
(12, 'Damen City-Bike'),
(13, 'Herren City-Bike'),
(14, 'Kinderanhänger');
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
CREATE TABLE fahrraeder (
    fahrradNr        int NOT NULL,
    bezeichnung      varchar(50),
    tagesmietpreis   double precision,
    fahrradartNr     int,
    PRIMARY KEY (fahrradNr),
    FOREIGN KEY (fahrradartNr) REFERENCES fahrradarten (fahrradartNr)
);
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
INSERT INTO fahrraeder VALUES
(1, 'Comus Einrad', 8.40, 5),
(2, 'Panther Thedy', 9.45, 9),
(3, 'Scott Comtessa', 10.50, 9),
(4, 'Scott Voltage Jr 16', 12.60, 9),
(5, 'Yazoo FSV-3.6N', 17.85, 10),
(6, 'Scott Aspect 50', 19.95, 1),
(7, 'Yazoo FSV-3.6N', 17.85, 10),
(8, 'Comus Einrad XM', 8.40, 5);
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


## Primär- und Fremdschlüssel

Wenn man zu einem Fahrrad die Fahrradart bestimmen will, reichen die Informationen in der Tabelle *Fahrraeder* nicht aus.

```sql
SELECT * FROM fahrraeder;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


In dieser Tabelle ist die Fahrradart der Fahrräder nicht aufgeführt.
In jeder Zeile steht aber die Nummer einer Fahrradart. Dies ist ein Fremdschlüssel, der auf den Primärschlüssel der Tabelle *Fahrradarten* verweist.


```sql
SELECT * FROM fahrradarten;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Um nun die Fahrradart eines Fahrrads herauszufinden, kann man den Eintrag eines Fahrrads in der Spalte `fahrradartnr` in der Tabelle *Fahrradarten* suchen.



Z. B. hat das erste Fahrrad die Fahrradnummer 5. In der Tabelle *Fahrradarten* steht bei dem Primärschlüssel 5 die Bezeichnung `Einrad`. Das erste Fahrrad ist also ein Einrad.


```sql
SELECT * FROM fahrradarten
where fahrradartnr = 5;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Genauso findet man zu jedem anderen Fahrrad die passende Fahrradart.
In den folgenden Tabellen ist markiert, welcher Fremdschlüssel auf
welchen Primärschlüssel verweist.


<img src="join_farbig.svg" alt="Join-Diagramm" style="display: block; margin: 0 auto; width: 100%; height: auto; background-color: #fff;" />



## Abfragen über zwei Tabellen

Wir haben gerade gesehen, dass man Fremdschlüssel nutzen kann, um
Informationen aus mehreren Tabellen zu kombinieren. Diese Verbindung
kann auch in einem einzigen `SELECT`-*Statement* genutzt werden.

Dabei schreibt man beide Tabellen hinter `FROM`. Zwischen den Tabellen steht `JOIN` (verbinden).


```sql
...
FROM fahrradarten JOIN fahrraeder ON fahrradarten.fahrradartnr = fahrraeder.fahrradartnr;
...
```

Hinter `ON` wird festgelegt, welche Zeilen zusammengehören.
Hier werden Zeilen kombiniert, deren Einträge in `fahrradartnr` gleich
sind. Diese Bedingung heißt Join-Bedingung. Weil die Spalte in beiden Tabellen vorkommt, schreibt man
`fahrradarten.fahrradartnr` und `fahrraeder.fahrradartnr`, um sie klar
zu unterscheiden. 

```admonish info
Solche Angaben nennt man qualifizierte Spaltennamen.
Ein qualifizierter Spaltenname hat die Form `tabellenname.spaltenname`.
```

Auch hinter `SELECT` ist diese Schreibweise wichtig, um
Uneindeutigkeiten zu vermeiden. Spalten mit gleichem Namen kann man mit
`AS` umbenennen.

```sql
SELECT fahrraeder.bezeichnung AS fahrrad,
       fahrradarten.bezeichnung AS fahrradart 
FROM 
fahrradarten JOIN fahrraeder ON fahrradarten.fahrradartnr = fahrraeder.fahrradartnr;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Um nicht immer den ganzen Tabellennamen schreiben zu müssen, kann man
Tabellen hinter `FROM` mit Aliasnamen abkürzen.

```sql
SELECT F.bezeichnung AS fahrrad,
       FA.bezeichnung AS fahrradart 
FROM 
fahrradarten FA JOIN fahrraeder  F ON FA.fahrradartnr = F.fahrradartnr;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

## Abfragen über mehrere Tabellen

Wenn mehr als zwei Tabellen abgefragt werden, muss die `FROM`-Klausel um mehrere `JOIN` `...` `ON`s erweitert werden.

```sql
...
FROM tabelle1 T1 JOIN tabelle2  T2 ON T1.spalte_1 = T2.spalte_2 
                 JOIN tabelle3  T3 ON T2.spalte_2 = T3.spalte_3
...
```