

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
    PRIMARY KEY (fahrradNr)
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


# Aggregierungen

Mithilfe von Aggregierungsfunktionen können wir aus allen Werten in
einer Spalte einen einzelnen Wert berechnen. Ein Beispiel für eine
Aggregierungsfunktionen ist die Funktion `AVG`. Diese berechnet
den Durchschnitt der Werte in einer Spalte. Damit kann z.B. der
durchschnittliche *Tagesmietpreis* aller Fahrräder berechnet werden.

```sql
SELECT AVG(tagesmietpreis) 
FROM Fahrraeder;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>



Die wichtigsten Aggregierungsfunktionen sind in der folgenden Tabelle
aufgeführt.

| Name   | Rückgabewert                         |
|--------|--------------------------------------|
| `MAX`  | größter Wert in der Spalte           |
| `MIN`  | kleinster Wert in der Spalte         |
| `SUM`  | Summe der Werte in der Spalte        |
| `AVG`  | Durchschnitt der Werte in der Spalte |
| `COUNT`| Anzahl der Werte in der Spalte       |



Mit der Funktion `COUNT` kann auch die Anzahl der zurückgegebenen
Zeilen gezählt werden. Hierfür schreibt man in die Klammer hinter dem
Funktionsnamen nicht den Namen einer Spalte sondern das Zeichen
`*`. 

```sql
SELECT COUNT(*)
FROM Fahrraeder;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Wenn man die Anzahl der verschiedenen *verschiedenen* Werte
in einer Spalte berechnen, muss in der Klammer hinter `COUNT` vor
dem Spaltenname `DISTINCT` stehen.




```sql
SELECT COUNT(DISTINCT bezeichnung)
FROM Fahrraeder;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Es können auch mehrere aggregierte Werte auf einmal abgefragt werden.

```sql
SELECT COUNT(fahrradNr), AVG(tagesmietpreis) 
FROM Fahrraeder;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>



Es ist aber nicht möglich gleichzeitig Spalten und aggregierte Werte
abzufragen, da eine Spalte mehrere Werte enthalten kann und das Ergebnis
einer Aggregierungsfunktion nur ein einzelner Wert ist. pt In der
folgenden Grafik ist der Datenfluss bei der Aggregierung zu sehen.


![](SQL-SELECT-AGGR.jpg)


