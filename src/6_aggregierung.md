
# Aggregierungen

```sql
CREATE TABLE fahrraeder (
    fahrradNr        int NOT NULL,
    bezeichnung      varchar(50),
    tagesmietpreis   double precision,
    fahrradartNr     int,
    PRIMARY KEY (fahrradNr)
);
```

<codapi-snippet>
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

<codapi-snippet>
</codapi-snippet>

## Aggregierungsfunktionen


Mit Aggregierungsfunktionen berechnest du aus vielen Werten einen
einzigen Wert.
Ein Beispiel ist `AVG`.
Damit bestimmst du den Durchschnitt einer Spalte,
z. B. den durchschnittlichen *Tagesmietpreis* aller Fahrräder.

```sql
SELECT AVG(tagesmietpreis)
FROM fahrraeder;
```
<codapi-snippet>
</codapi-snippet>



Die wichtigsten Aggregierungsfunktionen sind in der folgenden Tabelle
aufgeführt.

| Name   | Rückgabewert                         |
|--------|--------------------------------------|
| `MAX`  | größter Wert in der Spalte           |
| `MIN`  | kleinster Wert in der Spalte         |
| `SUM`  | Summe der Werte in der Spalte        |
| `AVG`  | Durchschnitt der Werte in der Spalte |
| `COUNT` | Anzahl der Werte in der Spalte      |



Mit `COUNT(*)` zählst du die Anzahl der zurückgegebenen Zeilen.
In die Klammer schreibst du dafür `*` statt eines Spaltennamens.

```sql
SELECT COUNT(*)
FROM fahrraeder;
```
<codapi-snippet>
</codapi-snippet>

Wenn du nur unterschiedliche Werte zählen willst,
schreibst du `DISTINCT` in die Klammer von `COUNT`.




```sql
SELECT COUNT(DISTINCT bezeichnung)
FROM fahrraeder;
```
<codapi-snippet>
</codapi-snippet>

Du kannst mehrere Aggregatwerte in einer Abfrage kombinieren.

```sql
SELECT COUNT(fahrradNr), AVG(tagesmietpreis)
FROM fahrraeder;
```
<codapi-snippet>
</codapi-snippet>



Ohne Gruppierung kannst du nicht beliebige Detailspalten und
Aggregatwerte mischen.
Eine Detailspalte enthält mehrere Werte,
ein Aggregat liefert genau einen Wert.
Die folgende Grafik zeigt den Datenfluss bei der Aggregierung.


![](SQL-SELECT-AGGR.jpg)


