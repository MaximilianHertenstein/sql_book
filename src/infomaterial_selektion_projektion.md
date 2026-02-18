# Datenbanken

SQL wird in der Regel nicht als Taschenrechner sondern als
Abfragesprache für Datenbanken genutzt. Das sagt auch der volle Name
*Structured Query Language* aus.

Eine Datenbank ist eine strukturierte Sammlung von Informationen. In
einer relationalen Datenbank liegen die Informationen als Tabellen vor.
In jeder Tabelle sind ähnliche Objekte aus der echten Welt gespeichert.
Jede Zeile einer Tabelle steht für ein solches Objekt. Jede Spalte steht
für eine Eigenschaft, die alle Objekte in dieser Tabelle haben. Als
Beispiel sind hier die ersten Zeilen der Tabelle zu sehen, in der die
Kunden des Fahrradverleihs gespeichert sind.

Um schnell einen Überblick über eine Datenbank zu bekommen, nutzt man
Diagramme, in denen alle Tabellen der Datenbank und deren Spalten, aber
keine Einträge aufgeführt sind. Jedes Rechteck steht für eine Tabelle
der Datenbank. Ganz oben steht jeweils der Tabellenname. Darunter stehen
die Spaltennamen und der Datentyp[^1] der Einträge in dieser Spalte. Die
Tabelle mit den Kunden befindet sich rechts unten.

<figure id="fig:DB_Fahrrad" data-latex-placement="H">
<div class="center">

</div>
<figcaption>Datenbank eines Fahrradverleihs</figcaption>
</figure>

# SQL als Abfragesprache

Mit `SELECT`{.SQL}-Statements lassen sich nicht nur Berechnungen
durchführen. Die Sprache *SQL (Structured Query Language)* wurde
speziell dafür entwickelt, Informationen aus Datenbanken abzufragen.

## Ganze Tabellen anzeigen

Um eine ganze Tabelle anzuzeigen, schreibt man hinter `SELECT`{.SQL} ein
`*`{.SQL} und in die nächste Zeile das Schlüsselwort `FROM`{.SQL} und
den Namen der gewünschte Tabelle. Die oben aufgeführte Tabelle erhält
man mit dem folgenden Befehl.

``` SQL
SELECT *
FROM Kunden;
```

## Projektionen

Mit `SELECT`{.SQL}-Befehlen können wir auch nur ausgewählte Spalten
einer Tabelle anschauen. Hierfür schreibt man hinter `SELECT`{.SQL} die
Namen der gewünschten Spalten. Zwischen zwei Spaltennamen muss ein Komma
stehen. Anschließend folgt das Schlüsselwort `FROM`{.SQL} und der Name
der Tabelle, aus der die Spalten stammen.

``` {.SQL escapeinside="||"}
SELECT |\textcolor{green}{vorname}|, |\textcolor{blue}{name}| 
FROM |\textcolor{red}{Kunden}|;
```

::: center
:::

Im Ergebnis sind dann nur noch die ausgewählten Spalten enthalten.

::: center
  *vorname*   *name*
  ----------- -----------
  Heinrich    Schneider
  Franz       Schlauch
  Franziska   Schlauch
  Jennifer    Böckle
  Johann      Hauffe
  Ali         Yilmaz
  $\vdots$    $\vdots$

\
:::

Eine solche Auswahl von Spalten einer Tabelle nennt man Projektion.

## Berechnete Spalten

Wir haben bereits gesehen, dass man mit `SELECT`{.SQL}-*Statements* die
Werte von Ausdrücken berechen kann. Dies können wir auch mit der Abfrage
von Spalten verbinden.

Ein Kunde könnte sich zum Beispiel für Fahrräder interessieren, deren
Tagesmietpreis unter 10 € liegt.

:::: minipage
::: flushleft
    *fahrradnr* *bezeichnung*           *tagesmietpreis* 
  ------------- --------------------- ------------------ --
              1 Comus Einrad                         8.4 
              2 Panther Thedy                       9.45 
              3 Scott Comtessa                      10.5 
              4 Scott Voltage Jr 16                 12.6 
       $\vdots$ $\vdots$                        $\vdots$ 
:::
::::

:::: minipage
::: center
               *tagesmietpreis unter 10*
  --------------------------------------
    [$\checkmark$]{style="color: green"}
    [$\checkmark$]{style="color: green"}
                  []{style="color: red"}
                  []{style="color: red"}
                                $\vdots$
:::
::::

Um auch diese Information anzuzeigen, könnte er die folgende Abfrage
stellen:

``` SQL
SELECT fahrradNr, bezeichnung, tagesmietpreis < 10
FROM Fahrraeder;
```

    *fahrradnr* *bezeichnung*         *tagesmietpreis \< 10*
  ------------- --------------------- ------------------------
              1 Comus Einrad          1
              2 Panther Thedy         1
              3 Scott Comtessa        0
              4 Scott Voltage Jr 16   0
       $\vdots$ $\vdots$              $\vdots$

\
Für jede Zeile in der Tabelle *Fahrraeder* wird dann aus dem Wert in der
Spalte *tagesmietpreis* der Wert des angegeben Ausdrucks berechnet und
in der Ergebnistabelle angezeigt.

Um nicht immer den Ausdruck selbst im Kopf der Spalte anzuzeigen, ist es
sinnvoll, mit dem Schlüsselwort `AS`{.SQL} zu arbeiten.

::: minted
SQL SELECT fahrradNr, bezeichnung, tagesmietpreis \< 10 AS
'Tagesmietpreis unter 10 Euro' FROM Fahrraeder;
:::

    *fahrradnr* *bezeichnung*         *Tagesmietpreis unter 10 Euro*
  ------------- --------------------- --------------------------------
              1 Comus Einrad          1
              2 Panther Thedy         1
              3 Scott Comtessa        0
              4 Scott Voltage Jr 16   0
       $\vdots$ $\vdots$              $\vdots$

\

## Selektion

Wenn man sich nur für die Fahrräder interessiert, deren Tagesmietpreis
unter 10 € liegt, kann man auch nur die Fahrräder anzeigen, die diese
Bedingung erfüllen.

:::: minipage
::: flushleft
    *fahrradnr* *bezeichnung*           *tagesmietpreis* 
  ------------- --------------------- ------------------ --
              1 Comus Einrad                         8.4 
              2 Panther Thedy                       9.45 
              3 Scott Comtessa                      10.5 
              4 Scott Voltage Jr 16                 12.6 
       $\vdots$ $\vdots$                        $\vdots$ 
:::
::::

:::: minipage
::: center
               *tagesmietpreis unter 10*
  --------------------------------------
    [$\checkmark$]{style="color: green"}
    [$\checkmark$]{style="color: green"}
                  []{style="color: red"}
                  []{style="color: red"}
                                $\vdots$
:::
::::

Dafür erweitert man das `SELECT`{.SQL}-*Statement* um eine weitere
Zeile, die mit `WHERE`{.SQL} beginnt. Hinter `WHERE`{.SQL} steht eine
Bedingung, die eine Zeile erfüllen muss, um im Ergebnis angezeigt zu
werden.

``` SQL
SELECT fahrradNr, bezeichnung
FROM Fahrraeder
WHERE tagesmietpreis < 10;
```

::: center
    *fahrradnr* *bezeichnung*
  ------------- -----------------
              1 Comus Einrad
              2 Panther Thedy
              8 Comus Einrad XM
       $\vdots$ $\vdots$

\
:::

Eine solche Auswahl von Zeilen nennt man Selektion.

## Veranschaulichung

Bei den Anfragen, die wir bis jetzt geschrieben haben, wird in einer
`FROM`{.SQL}-Klausel eine Tabelle angegeben. In der
`WHERE`{.SQL}-Klausel wird eine Bedingung für die Zeilen der Tabelle
angegeben. Nur die Zeilen, die diese Bedingung erfüllen, werden im
Ergebnis berücksichtigt. Hinter `SELECT`{.SQL} verwendet man
Spaltennamen oder allgemeiner Ausdrücke. Diese Ausdrücke werden für jede
Zeile, die nicht durch die `WHERE`{.SQL}-Klausel herausgefiltert wird,
berechnet. Alle Ergebnisse zusammen sind dann in einer Ergebnistabelle
zu sehen.

<figure id="fig:meine-grafik" data-latex-placement="H">
<img src="SQL-Select" style="width:70.0%" />
<figcaption>Datenfluss bei <code
class="sourceCode sql"><span class="kw">SELECT</span></code>-Statements</figcaption>
</figure>

[^1]: mit den Datentypen, die wir noch nicht kennen und weiteren
    Komponenten des Diagramms werden wir uns später beschäftigen
