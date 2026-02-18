# Datenbankabfragen

SQL wird in der Regel nicht als Taschenrechner sondern als
Abfragesprache für Datenbanken genutzt. Das sagt auch der volle Name
*Structured Query Language* aus. 

Um Abfragen zu schreiben müssen wir zunächst eine Datenbank erstellen.

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



Um schnell einen Überblick über eine Datenbank zu bekommen, nutzt man
Diagramme, in denen alle Tabellen der Datenbank und deren Spalten, aber
keine Einträge aufgeführt sind. Jedes Rechteck steht für eine Tabelle
der Datenbank. Ganz oben steht jeweils der Tabellenname. Darunter stehen
die Spaltennamen und der Datentyp der Einträge in dieser Spalte. Beziehungen zwischen den Tabellen sind als Linien eingezeichnet.

![](eer_diagram_fahrradverleih.svg)


## Ganze Tabellen anzeigen

Um eine ganze Tabelle anzuzeigen, schreibt man hinter `SELECT` ein
`*` und in die nächste Zeile das Schlüsselwort `FROM` und
den Namen der gewünschte Tabelle. Die oben aufgeführte Tabelle erhält
man mit dem folgenden Befehl.

```sql
SELECT *
FROM Kunden;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

## Projektionen

Mit `SELECT`-Befehlen können wir auch nur ausgewählte Spalten
einer Tabelle anschauen. Hierfür schreibt man hinter `SELECT` die
Namen der gewünschten Spalten. Zwischen zwei Spaltennamen muss ein Komma
stehen. Anschließend folgt das Schlüsselwort `FROM` und der Name
der Tabelle, aus der die Spalten stammen.

```sql
SELECT vorname, name 
FROM Kunden;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>




Eine solche Auswahl von Spalten einer Tabelle nennt man Projektion.

## Berechnete Spalten

Wir haben bereits gesehen, dass man mit `SELECT`-*Statements* die
Werte von Ausdrücken berechen kann. Dies können wir auch mit der Abfrage
von Spalten verbinden.

Ein Kunde könnte sich zum Beispiel für Fahrräder interessieren, deren
Tagesmietpreis unter 10 € liegt.


Um auch diese Information anzuzeigen, könnte er die folgende Abfrage
stellen:

```sql
SELECT fahrradNr, bezeichnung, tagesmietpreis < 10
FROM Fahrraeder;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Für jede Zeile in der Tabelle *Fahrraeder* wird dann aus dem Wert in der
Spalte *tagesmietpreis* der Wert des angegeben Ausdrucks berechnet und
in der Ergebnistabelle angezeigt.

Um nicht immer den Ausdruck selbst im Kopf der Spalte anzuzeigen, ist es
sinnvoll, mit dem Schlüsselwort `AS` zu arbeiten.

```sql
SELECT fahrradNr, bezeichnung, tagesmietpreis < 10 AS
tagesmietpreis_unter_10_euro FROM Fahrraeder;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>



## Selektion

Wenn man sich nur für die Fahrräder interessiert, deren Tagesmietpreis
unter 10 € liegt, kann man auch nur die Fahrräder anzeigen, die diese
Bedingung erfüllen.


Dafür erweitert man das `SELECT`-*Statement* um eine weitere
Zeile, die mit `WHERE` beginnt. Hinter `WHERE` steht eine
Bedingung, die eine Zeile erfüllen muss, um im Ergebnis angezeigt zu
werden.

```sql
SELECT fahrradNr, bezeichnung
FROM Fahrraeder
WHERE tagesmietpreis < 10;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>



Eine solche Auswahl von Zeilen nennt man Selektion.

## Veranschaulichung

Bei den Anfragen, die wir bis jetzt geschrieben haben, wird in einer
`FROM`-Klausel eine Tabelle angegeben. In der
`WHERE`-Klausel wird eine Bedingung für die Zeilen der Tabelle
angegeben. Nur die Zeilen, die diese Bedingung erfüllen, werden im
Ergebnis berücksichtigt. Hinter `SELECT` verwendet man
Spaltennamen oder allgemeiner Ausdrücke. Diese Ausdrücke werden für jede
Zeile, die nicht durch die `WHERE`-Klausel herausgefiltert wird,
berechnet. Alle Ergebnisse zusammen sind dann in einer Ergebnistabelle
zu sehen.

![](SQL-SELECT.jpg)

