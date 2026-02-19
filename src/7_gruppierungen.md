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
(8, 'Comus Einrad XM', '4890/H2', 8.40, 56.00, '2022-01-02', 5, 22),
(9, 'Fishbone FR 100', 'U/H2345', 19.95000, 285.00000, '2020-10-11', 3, 3),
(10, 'Fishbone FR 100', 'U/H3445', 19.95000, 285.00000, '2020-10-11', 3, 3),
(11, 'Fishbone FR 100', 'U/H6745', 19.95000, 285.00000, '2020-10-11', 3, 3),
(12, 'Fishbone FR 100', 'U/H8907', 19.95000, 285.00000, '2020-10-11', 3, 3),
(13, 'Fishbone FR 100', 'U/H341', 19.95000, 285.00000, '2020-10-11', 3, 3),
(14, 'Scott Comtessa', '75/32', 10.50000, 189.00000, '2022-05-27', 9, 4),
(15, 'Yazoo FSV-3.6N', '298H46', 17.85000, 310.00000, '2022-05-27', 10, 5),
(16, 'Scott Aspect 50', 'MTB/B34', 19.95000, 398.00000, '2021-07-23', 1, 4),
(17, 'Scott Aspect 50', 'MTB/C34', 19.95000, 398.00000, '2022-05-27', 1, 4),
(18, 'Bulls Sharptail 2', 'MTB/R34', 21.00000, 412.00000, '2022-05-15', 1, 9),
(19, 'Bulls Sharptail 2', 'MTB/R36', 21.00000, 412.00000, '2022-05-15', 1, 9),
(20, 'Bulls Sharptail 2', 'MTB/R49', 21.00000, 412.00000, '2022-05-15', 1, 9),
(21, 'Bulls Sharptail 2', 'MTB/H34', 21.00000, 412.00000, '2022-05-15', 1, 9),
(22, 'Bulls Sharptail 2', 'MTB/G11', 21.00000, 412.00000, '2022-05-15', 1, 9);
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

# Gruppierungen

Mithilfe von Gruppierungen können Teile der Tabelle anhand des Werts
einer Spalte oder eines Ausdrucks in Gruppen eingeteilt werden.
Anschließend kann mit einer Aggregierungsfunktion für jede Gruppe ein
Wert berechnet werden. Im folgenden Beispiel wurden alle Zeilen der
Tabelle *Fahrräder* nach der *Bezeichnung* gruppiert. Für jede dieser
Gruppen wurde dann die Anzahl der Fahrräder in der Gruppe berechnet.

<img src="gruppierung_farbig.svg" alt="Gruppierung-Diagramm" style="display: block; margin: 0 auto; width: 100%; height: auto; background-color: #fff;" />




Dafür schreibt man hinter die Schlüsselwörter `GROUP` und
`BY` den Ausdruck, nach dem gruppiert werden soll.

```sql
SELECT bezeichnung, COUNT(fahrradNr)
FROM fahrraeder 
GROUP BY bezeichnung;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Die Anzahl der Gruppen entspricht dann der Anzahl der verschiedenen
Werte, die der Ausdruck in den Zeilen der Tabelle annimmt. In diesem
Beispiel gibt es genau so viele Gruppen, wie es verschiedene
*Bezeichnungen* in der Tabelle *Fahrräder* gibt.

Wenn `GROUP BY` genutzt wird, dürfen hinter `SELECT` nur
Ausdrücke mit Aggregierungsfunktionen und der Ausdruck nach dem
gruppiert wurde, genutzt werden. Für alle anderen Ausdrücke ist nicht
klar, ob diese pro Gruppe nur einen Wert haben.


![](SQL-SELECT-AGGR-GROUP.jpg)



# Having

In der `WHERE`-Klausel kann man eine Bedingung angegeben. Damit
werden nur die Zeilen der Tabelle, die in der `FROM`-Klausel
angegeben wird, betrachtet, die diese Bedingung erfüllen.

Durch Gruppierung entsteht eine neue Tabelle. Auch diese kann nochmal
gefiltert werden. Dafür nutzt man die `HAVING`-Klausel. In dieser
gibt man eine Bedingung für die Gruppen an, die im Ergebnis
berücksichtigt werden sollen. In dieser Bedingung können nur Ausdrücke
mit Aggregierungsfunktionen oder der Gruppierungsausdruck verwendet
werden. Für alle anderen Ausdrücke ist wieder nicht klar, ob diese pro
Gruppe nur einen Wert haben.

```sql
SELECT COUNT(fahrradNr), bezeichnung 
FROM Fahrraeder 
GROUP BY bezeichnung
HAVING COUNT(fahrradNr) > 4;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>



Der Datenfluss bei einem `SELECT`-Statement mit Gruppierung und
`HAVING`-Klausel ist in

![](SQL-SELECT-AGGR-GROUP-HAVING.jpg)


