
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

## Aggregierungsfunktionen


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


