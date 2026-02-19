# SQL als Taschenrechner

## Addition, Multiplikation und Subtraktion

Du kannst *SQL* wie einen Taschenrechner nutzen.
Schreibe den Rechenausdruck hinter das Schlüsselwort `SELECT` und beende die Abfrage mit einem Semikolon.
Das Ergebnis erscheint als Tabelle.

```sql
SELECT 1 + 1;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Du kannst auch mehrere Ausdrücke in einer Abfrage berechnen.
Trenne die Ausdrücke dabei mit einem Komma.

```sql
SELECT 3 * 3, (1 - 2) * 3 + 5;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

`SELECT` kann wie alle SQL-Schlüsselwörter klein oder groß geschrieben werden.
Üblich ist die Großschreibung von Schlüsselwörtern und Funktionsnamen.

## Division

In *SQL* dividierst du Zahlen mit `/`.
Sind beide Operanden Integer, erhältst du eine ganzzahlige Division.
Sobald ein Operand eine Kommazahl ist, bekommst du das reguläre Divisionsergebnis.

```sql
SELECT 10/4, 10/4.0, 10.0/4;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

## Funktionen

In Ausdrücken kannst du auch Funktionen verwenden.
Ein wichtiges Beispiel ist `ROUND`.
Damit rundest du Kommazahlen auf eine gewünschte Anzahl von Nachkommastellen.

```sql
SELECT ROUND(3.1415927, 2), 5 * ROUND(10.0 / 4, 1);
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


## Aliase

Mit `AS` vergibst du eigene Spaltenüberschriften.

```sql
SELECT 5 AS side_length, 5 * 5 AS area;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Wenn ein Spaltentitel Leerzeichen enthält, setzt du ihn in Backticks.

```sql
SELECT 5 AS `side length`, 5 * 5 AS area;
```
<codapi-snippet engine="wasi" sandbox="sqlite" editor="basic">
</codapi-snippet>


## Vergleiche, Wahrheitswerte und logische Operatoren

In *SQL* kannst du auch mit Wahrheitswerten arbeiten.

```sql
SELECT true, false;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Beim Vergleich zweier Werte erhältst du immer einen Wahrheitswert.
Ein Vergleich mit `=` ist genau dann `true`, wenn beide Seiten gleich sind.

```sql
SELECT 1 = 1, 2 * 2 = 2 + 2, 3 = 4;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Die wichtigsten Vergleichsoperatoren sind in der folgenden Tabelle zu
sehen.

| Operator | Name            | Zu erfüllende Bedingung |
|----------|-----------------|--------------------------|
| `=`      | gleich          | Die zu vergleichenden Werte sind identisch |
| `!=` `<>`| ungleich        | Die zu vergleichenden Werte sind verschieden |
| `<`      | kleiner         | Der linke Vergleichswert ist kleiner |
| `>`      | größer          | Der linke Vergleichswert ist größer |
| `<=`     | kleiner gleich  | Der linke Vergleichswert ist kleiner oder beide sind gleich |
| `>=`     | größer gleich   | Der linke Vergleichswert ist größer oder beide sind gleich |


## Verneinung mit NOT

Mit `NOT` verneinst du einen Wahrheitswert.

```sql
SELECT NOT true, NOT false;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

```sql
SELECT NOT 10 > 3;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

## Verknüpfung von Bedingungen

Mit `AND` und `OR` verknüpfst du zwei boolesche Ausdrücke.

Bei `AND` ist der Gesamtausdruck nur dann `true`, wenn beide Teilausdrücke `true` sind.

```sql
SELECT 10 > 3 AND 2 = 2;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


```sql
SELECT 2 > 1 AND 4 != 4;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Bei `OR` ist der Gesamtausdruck `true`, sobald mindestens ein Teilausdruck `true` ist.

```sql
SELECT 1 = 1 OR 2 > 3;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


```sql
SELECT 1 = 3 OR 2 > 3;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

In der Mathematik gilt die Punkt-vor-Strich-Regel. Diese besagt, dass Mal und Geteilt immer vor Plus oder Minus ausgewertet werden.


\\[
1 + 2 \cdot 3 = 1 + 6 = 7
\\]

Wenn die Addition zuerst ausgewertet werden soll, ist eine Klammer notwendig.
\\[
(1 + 2) \cdot 3 = 3 \cdot 3 = 9
\\]


In *SQL* gibt es eine ähnliche Regel. Diese besagt, dass `AND` vor `OR` ausgewertet wird.



```sql
SELECT true OR false AND false;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Auch hier legst du mit Klammern die Auswertungsreihenfolge fest.

```sql
SELECT (true OR false) AND false;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


## Strings

Ein weiterer Datentyp in SQL sind Zeichenketten (`VARCHAR`). Vergleiche
mit Zeichenketten haben oft ein überraschendes Ergebnis.

```sql
SELECT '10' < '2';
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Zeichenketten werden anders verglichen als Zahlen.
Dieser Vergleich heißt lexikalisch.
Dabei werden die Zeichen von links nach rechts verglichen.
Unterscheiden sich die ersten Zeichen, entscheidet deren Reihenfolge im Alphabet.
Sind sie gleich, wird mit dem nächsten Zeichen weiterverglichen.



```sql
SELECT 'abc' > 'abd';
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Wenn du am Ende eines Strings angekommen bist und der zweite String noch
weitere Zeichen hat, ist der zweite String größer.

```sql
SELECT 'ab' < 'abd';
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

## Textmustererkennung

Um Strings mit Textmustern zu vergleichen, kann der Operator
`LIKE` verwendet werden. Dieser stellt zwei Platzhalter zur
Verfügung:

1.  `%` steht für beliebig viele Zeichen.

    ```sql
    SELECT 'Huber' LIKE 'Hu%';
    ```
    <codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
    </codapi-snippet>

    ```sql
    SELECT 'Huber' LIKE 'Hun%';
    ```
    <codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
    </codapi-snippet>


2.  `_` steht für genau ein Zeichen.

    ```sql
    SELECT 'Huber' LIKE 'Hu_';
    ```
    <codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
    </codapi-snippet>

    ```sql
    SELECT 'Huber' LIKE 'Hu___';
    ```
    <codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
    </codapi-snippet>



## Datumswerte

Datumswerte sind in SQL ein eigener Datentyp mit dem Namen `DATE`. Sie
werden in Anführungszeichen im Format `yyyy-mm-dd` geschrieben. Die so
geschriebenen Datumswerte können miteinander verglichen werden. Das spätere
Datum ist größer.

```sql
SELECT '1949-09-23' > '1941-05-24';
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Es ist auch möglich, das Jahr, den Monat oder den Tag als Zahl
auszuwählen.

```sql
SELECT year('1949-09-23'), month('1949-09-23'), day('1949-09-23');
```
<codapi-snippet  sandbox="mysql" editor="basic">
</codapi-snippet>

Mit der Funktion `CURDATE` kann das aktuelle Datum in dem gerade
erklärten Format bestimmt werden.

```sql
SELECT CURDATE();
```
<codapi-snippet  sandbox="mysql" editor="basic">
</codapi-snippet>
