# Abfragen über mehrere Tabellen

```sql
CREATE TABLE fahrradarten (
    fahrradartNr     int NOT NULL,
    bezeichnung      varchar(50),
    kurzerlaeuterung varchar(60),
    PRIMARY KEY (fahrradartNr)
);
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
INSERT INTO fahrradarten VALUES
(1, 'Mountain-Bike', 'Geländefahrrad meist mit Federung'),
(2, 'Cross-Bike', 'sportlicher Einsatz Straße & Gelände (Trekking-Touren)'),
(3, 'BMX-Bike', 'Fahrräder ohne Zulassung StVZO für Bahnen'),
(4, 'DirtBike', 'Extremkletterer zum Springen und für Tourniere ohne StVZO'),
(5, 'Einrad', 'Funrad mit nur einem Rad'),
(6, 'Tandem', 'Fahrrad für 2 Personen'),
(7, 'Kinderfahrrad ab 20 Zoll', 'Fahrrad für Kinder ab 5 Jahren'),
(8, 'Jugendfahrrad', 'Fahrrad für Jugendliche'),
(9, 'Kinderrad Fahrrad 12-18 Zoll', 'Fahrrad ab 3 Jahre'),
(10, 'Jugendfahrrad ab 26 Zoll', 'Fahrrad ab 7 Jahren'),
(11, 'Rennrad', 'Straßenrennrad'),
(12, 'Damen City-Bike', 'Damenräder für Straßen und Wege'),
(13, 'Herren City-Bike', 'Herrenräder für Straßen und Wege'),
(14, 'Kinderanhänger', 'Anhänger für den Transport von Kindern');
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
CREATE TABLE fahrraeder (
    fahrradNr        int NOT NULL,
    bezeichnung      varchar(50),
    rahmenNummer     varchar(10),
    tagesmietpreis   double precision,
    anschaffungswert double precision,
    kaufdatum        date,
    fahrradartNr     int,
    herstellerNr     int,
    PRIMARY KEY (fahrradNr),
    FOREIGN KEY (fahrradartNr) REFERENCES fahrradarten (fahrradartNr)
);
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
INSERT INTO fahrraeder VALUES
(1, 'Comus Einrad', '4590/H2', 8.40, 56.00, '2021-05-23', 5, 22),
(2, 'Panther Thedy', '340/90089', 9.45, 145.00, '2022-01-17', 9, 5),
(3, 'Scott Comtessa', '56/32', 10.50, 189.00, '2022-05-05', 9, 4),
(4, 'Scott Voltage Jr 16', '76/67654e', 12.60, 246.00, '2021-09-05', 9, 4),
(5, 'Yazoo FSV-3.6N', '198H45', 17.85, 310.00, '2021-09-21', 10, 5),
(6, 'Scott Aspect 50', 'MTB/B88', 19.95, 398.00, '2021-07-23', 1, 4),
(7, 'Yazoo FSV-3.6N', '198H47', 17.85, 310.00, '2021-09-21', 10, 5),
(8, 'Comus Einrad XM', '4890/H2', 8.40, 56.00, '2022-01-02', 5, 22);
```

<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


## Primär- und Fremdschlüssel

In der Tabelle *Fahrraeder* ist die Fahrradart der Fahrräder nicht aufgeführt. 

```sql
SELECT * FROM fahrraeder;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

In jeder Zeile steht aber die Nummer einer Fahradart. Dies ist ein Fremschlüssel, der auf den Primärschlüssel der Tabelle *Fahrradarten* verweist.


```sql
SELECT * FROM fahrradarten;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Um nun die Fahrradart eines Fahrrads herauszufinden, kann man den Eintrag eines Fahhrads in der Spalte `fahrradartnr` in der Tabelle *Fahrradarten* suchen.



Z.B. hat das erste Fahrrad die Fahrradnummer 5. In der Tabelle *Fahrradarten*  steht bei dem Primärschlüssel 5 die Bezeichnung `Einrad`. Das erste Fahrrad ist also ein Einrad.


```sql
SELECT * FROM fahrradarten
where fahrradartnr = 5;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Genau so findet man zu jedem anderen Fahrrad die Bezeichnung der Fahrradart. In den folgenen Tabellen ist markiert, welcher Fremdschlüssel auf welchen Primärschlüssel verweist.


<img src="join_farbig.svg" alt="Join-Diagramm" style="display: block; margin: 0 auto; width: 100%; height: auto; background-color: #fff;" />



## Abfragen über mehrere Tabellen

Wir haben gerade gesehen, dass man Fremdschlüssel dazu nutzen kann, um
Informationen aus mehreren Tabellen zu kombinieren. Eine solceh Verbindung
kann auch in einem einzigen  `SELECT`-*Statement* genutzt werden.

Dabei schreibt man beide Tabellen hinter `FROM`. Zwischen den Tabellen steht `JOIN` (verbinden).


```sql
...
FROM fahrradarten JOIN fahrraeder ON fahrradarten.fahrradartnr = fahrraeder.fahrradartnr;
...
```

Hinter `ON` wird fesgelegt, dass die Zeilen zueinander kombiniert werden, deren Einträge in den Spalten mit dem Namen `fahrradartnr` gleich sind.
Weil die Spalte `fahrradartnr` in beiden Tabellen vorkommt, schreibt man `fahrradarten.fahrradartnr` und `fahrraeder.fahrradartnr` um diese zu unterscheiden.

Auch bei der Auswahl der Spalten hinter `SELECT` muss diese Schreibweise genutzt werden um Uneindeutigkeiten zu vermeiden. Hierbei muss man Spalten mit einem uneindeutigen Namen
mit `AS` umbennen.

```sql
SELECT fahrraeder.bezeichnung AS fahrrad,
       fahrradarten.bezeichnung AS fahrradart 
FROM 
fahrradarten JOIN fahrraeder ON fahrradarten.fahrradartnr = fahrraeder.fahrradartnr;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Um nicht immer den ganzen Tabellennamen schreiben zu müssen, kann man den Tabellen hinter `FROM` einen Abkürzung geben.

```sql
SELECT F.bezeichnung AS fahrrad,
       FA.bezeichnung AS fahrradart 
FROM 
fahrradarten FA JOIN fahrraeder  F ON FA.fahrradartnr = F.fahrradartnr;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>
