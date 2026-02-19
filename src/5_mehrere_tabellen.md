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

In jeder Zeile steht aber die Nummer einer Fahhradart. Dies ist ein Fremschlüssel, der auf den Primärschlüssel der Tabelle *Fahrradarten* verweist.


```sql
SELECT * FROM fahrradarten;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Um nun die Fahrradart eines Fahrrads herauszufinden, kann man den Eintrag eines Fahhrads in der Spalte `fahrradartnr` in der Tabelle *Fahrradarten* suchen.


```sql
SELECT * FROM fahrradarten
where fahrradartnr = 5;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Z.B. hat das erste Fahrrad die Fahrradnummer 5. In der Tabelle *Fahrradarten*  steht bei dem Primärschlüssel 5 die Bezeichnung `Einrad`. Das erste Fahrrad ist also ein Einrad.





![](join_farbig.svg)



## Abfragen über mehrere Tabellen

Wir haben gerade gesehen, dass man Fremdschlüssel dazu nutzen kann, um
Informationen aus mehreren Tabellen zu kombinieren. Diese Verbindungen
können auch in einer einzigen SQL-Abfrage genutzt werden. Hierfür
schreibt man die Tabellen in einem `SELECT`-*Statement* mit Kommas
getrennt hinter `FROM`.

Wenn man z. B. die Bezeichnung jedes Fahrrads zusammen mit der
Bezeichnung der Fahrradart anzeigen will, benötigt man die Tabellen
*Fahrradarten* und *Fahrraeder*. Wenn in den Tabellen zwei Spalten mit
den selben Namen vorkommen, muss man den Tabellen in der
`FROM`-Klausel verschiedene Namen geben. Diese schreibt man hinter
die Namen der Tabellen. Anschließend kann man auf die Werte in den
Spalten zugreifen, indem man hinter den neuen Tabellennamen einen Punkt
und den Namen der Spalte schreibt. Um die Spalten im Ergebnis
auseinander halten zu können müssen diese mit `AS` umbenannt
werden.

```sql
SELECT FA.bezeichnung AS Fahrradartbezeichnung, F.bezeichnung AS Fahrradbezeichnung
FROM Fahrradarten FA, Fahrraeder F;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>



Das Ergebnis macht schon auf den ersten Blick wenig Sinn. Das *Comus
Einrad* ist sicher nicht gleichzeitig ein *Mountain-Bike* und ein
*Cross-Bike*. Der Grund für dieses überraschende Ergebnis ist, dass jede
*Bezeichnung* aus der Tabelle *Fahrradarten* mit jeder *Bezeichnung* aus
der Tabelle *Fahrraeder* kombiniert wurde. Um zu jedem Fahrrad nur die
korrekte Fahrradart anzuzeigen, müssen wir ausnutzen, dass die Spalte
*FahrradartNr* in beiden Tabellen vorkommt.



Im Ergebnis sollten die Zeilen aus der Tabelle *Fahrraeder* nur mit den
Zeilen aus der Tabelle *Fahrradarten* kombiniert werden, bei denen der
Wert in den Spalten mit dem Namen *fahrradartNr* übereinstimmt. Dies
wird mit der folgenden Abfrage realisiert.

```sql
SELECT FA.bezeichnung AS Fahrradartbezeichnung, F.bezeichnung AS Fahrradbezeichnung
WHERE FA.fahrradartNr = F.fahrradartNr;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

