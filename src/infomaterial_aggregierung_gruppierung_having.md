# Aggregierungen

Mithilfe von Aggregierungsfunktionen können wir aus allen Werten in
einer Spalte einen einzelnen Wert berechnen. Ein Beispiel für eine
Aggregierungsfunktionen ist die Funktion `AVG`{.SQL}. Diese berechnet
den durchschnittlichen Wert in einer Spalte. Damit kann der
durchschnittliche *Tagesmietpreis* aller Fahrräder berechnet werden.

``` SQL
SELECT AVG(tagesmietpreis) 
FROM Fahrraeder;
```

    *AVG(tagesmietpreis)*
  -----------------------
        19.19166666666666

\
Aus kosmetischen Gründen sollte man das Ergebnis runden und einen Alias
verwenden.

``` SQL
SELECT ROUND(AVG(tagesmietpreis), 3) AS 'Durchschnittlicher Tagesmietpreis' 
FROM Fahrraeder;
```

    *Durchschnittlicher Tagesmietpreis*
  -------------------------------------
                                19.1912

\
Die wichtigsten Aggregierungsfunktionen sind in der folgenden Tabelle
aufgeführt.

       Name       Rückgabewert
  --------------- --------------------------------------
    `MAX`{.SQL}   größter Wert in der Spalte
    `MIN`{.SQL}   kleinster Wert in der Spalte
    `SUM`{.SQL}   Summe der Werte in der Spalte
    `AVG`{.SQL}   Durchschnitt der Werte in der Spalte
   `COUNT`{.SQL}  Anzahl der Werte in der Spalte

  : Wichtige Aggregierungssfunktionen

Mit der Funktion `COUNT`{.SQL} kann auch die Anzahl der zurückgegebenen
Zeilen gezählt werden. Hierfür schreibt man in die Klammer hinter dem
Funktionsnamen nicht den Namen einer Spalte sondern das Zeichen
`*`{.SQL}. Wenn man die Anzahl der verschiedenen *verschiedenen* Werte
in einer Spalte berechnen, muss in der Klammer hinter `COUNT`{.SQL} vor
dem Spaltenname `DISTINCT`{.SQL} stehen.

``` {.SQL samepage=""}
SELECT COUNT(DISTINCT bezeichnung)
FROM Fahrraeder;
```

Es können auch mehrere aggregierte Werte auf einmal abgefragt werden.

``` {.SQL samepage=""}
SELECT COUNT(fahrradNr), AVG(tagesmietpreis) 
FROM Fahrraeder;
```

    COUNT(fahrradNr)   AVG(tagesmietpreis)
  ------------------ ---------------------
                  36     19.19166666666666

Es ist aber nicht möglich gleichzeitig Spalten und aggregierte Werte
abzufragen, da eine Spalte mehrere Werte enthalten kann und das Ergebnis
einer Aggregierungsfunktion nur ein einzelner Wert ist. pt In der
folgenden Grafik ist der Datenfluss bei der Aggregierung zu sehen.

<figure id="fig:SQL-SELECT-AGGR" data-latex-placement="H">
<img src="SQL-SELECT-AGGR.jpg" style="width:80.0%" />
<figcaption>Datenfluss bei <code
class="sourceCode sql"><span class="kw">SELECT</span></code>-Statements
mit Aggregierung</figcaption>
</figure>

# Gruppierungen

Mithilfe von Gruppierungen können Teile der Tabelle anhand des Werts
einer Spalte oder eines Ausdrucks in Gruppen eingeteilt werden.
Anschließend kann mit einer Aggregierungsfunktion für jede Gruppe ein
Wert berechnet werden. Im folgenden Beispiel wurden alle Zeilen der
Tabelle *Fahrräder* nach der *Bezeichnung* gruppiert. Für jede dieser
Gruppen wurde dann die Anzahl der Fahrräder in der Gruppe berechnet.\

::: minipage
:::

::: minipage
:::

Dafür schreibt man hinter die Schlüsselwörter `GROUP`{.SQL} und
`BY`{.SQL} den Ausdruck, nach dem gruppiert werden soll.

``` {.SQL samepage=""}
SELECT COUNT(fahrradNr), bezeichnung 
FROM Fahrraeder 
GROUP BY bezeichnung;
```

Die Anzahl der Gruppen entspricht dann der Anzahl der verschiedenen
Werte, die der Ausdruck in den Zeilen der Tabelle annimmt. In diesem
Beispiel gibt es genau so viele Gruppen, wie es verschiedene
*Bezeichnungen* in der Tabelle *Fahrräder* gibt.

Wenn `GROUP BY`{.SQL} genutzt wird, dürfen hinter `SELECT`{.SQL} nur
Ausdrücke mit Aggregierungsfunktionen und der Ausdruck nach dem
gruppiert wurde, genutzt werden. Für alle anderen Ausdrücke ist nicht
klar, ob diese pro Gruppe nur einen Wert haben.

<figure id="fig:SQL-SELECT-AGGR-GROUP" data-latex-placement="h">
<img src="SQL-SELECT-AGGR-GROUP.jpg" />
<figcaption>Datenfluss bei <code
class="sourceCode sql"><span class="kw">SELECT</span></code>-Statements
mit Gruppierung</figcaption>
</figure>

# Having

In der `WHERE`{.SQL}-Klausel kann man eine Bedingung angegeben. Damit
werden nur die Zeilen der Tabelle, die in der `FROM`{.SQL}-Klausel
angegeben wird, betrachtet, die diese Bedingung erfüllen.

Durch Gruppierung entsteht eine neue Tabelle. Auch diese kann nochmal
gefiltert werden. Dafür nutzt man die `HAVING`{.SQL}-Klausel. In dieser
gibt man eine Bedingung für die Gruppen an, die im Ergebnis
berücksichtigt werden sollen. In dieser Bedingung können nur Ausdrücke
mit Aggregierungsfunktionen oder der Gruppierungsausdruck verwendet
werden. Für alle anderen Ausdrücke ist wieder nicht klar, ob diese pro
Gruppe nur einen Wert haben.

``` SQL
SELECT COUNT(fahrradNr), bezeichnung 
FROM Fahrraeder 
GROUP BY bezeichnung
HAVING COUNT(fahrradNr) > 4;
```

        *\#*          *COUNT(FahrradNr)* *Bezeichnung*
  ---------- --------------------------- -------------------------------------------
           1   [5]{style="color: green"} [Bulls Sharptail 2]{style="color: green"}
           2    [5]{style="color: blue"} [Fishbone FR 100]{style="color: blue"}
    $\vdots$                    $\vdots$ $\vdots$

Der Datenfluss bei einem `SELECT`{.SQL}-Statement mit Gruppierung und
`HAVING`{.SQL}-Klausel ist in
[3](#fig:SQL-SELECT-AGGR-GROUP_Having){reference-type="ref+label"
reference="fig:SQL-SELECT-AGGR-GROUP_Having"} zu sehen.

<figure id="fig:SQL-SELECT-AGGR-GROUP_Having" data-latex-placement="H">
<img src="SQL-SELECT-AGGR-GROUP-HAVING.jpg" style="width:80.0%" />
<figcaption>Datenfluss bei <code
class="sourceCode sql"><span class="kw">SELECT</span></code>-Statements
mit Gruppierung und <code
class="sourceCode sql"><span class="kw">HAVING</span></code>-Klausel</figcaption>
</figure>
