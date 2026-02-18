# SQL als Taschenrechner

## Addition, Multiplikation und Subtraktion

Wir können die Sprache *SQL* als Taschenrechner verwenden. Hierfür schreibt man den
Rehenausrduck, den man auswerten möchte, hinter das Schlüsselwort
`SELECT`. Hinter dem Ausdruck muss ein Semikolon stehen. 
Das Ergebnis wird in einer Tabelle angezeigt.

```sql
SELECT 1 + 1;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Es ist auch möglich, mehrere Rechnungen in einem Befehl auszuführen.
Hierfür schreibt man ein Komma zwischen zwei Ausdrücke.

```sql
SELECT 3 * 3, (1 - 2) * 3 + 5;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

`SELECT` kann wie alle Schlüsselwörter in *SQL* klein oder groß
geschrieben werden. Es ist jedoch üblich, Schlüsselwörter und
Funktionsnamen groß zu schreiben.

## Division

In *SQL* können Zahlen mit dem Operator `/` dividiert werden. Wenn
beide Operanden Integer sind, wird die ganzzahlige Division
durchgeführt. Ansonsten wird das Ergebnis der normalen Division
berechnet.

```sql
SELECT 10/4, 10/4.0, 10.0/4;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

## Funktionen

In Ausdrücken können auch Funktionen verwendet werden. Ein wichtiges
Beispiel ist die Funktion `ROUND`. Diese kann dazu genutzt werden,
eine Kommazahl auf eine gewünschte Zahl von Nachkommastellen zu runden.

```sql
SELECT ROUND(3.1415927, 2), 5 * ROUND(10.0 / 4, 1);
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


## Aliase

  In *SQL* kann man die Spaltenüberschriften auch selbst wählen. Dafür wird das Schlüsselwort `AS` genutzt.

```sql
SELECT 5 AS side_length, 5 * 5 AS area;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Wenn man Leerzeichen in einem Spaltentitel verwenden möchte, muss man
diesen zwischen zwei Backticks einschließen.

```sql
SELECT 5 AS `side length`, 5 * 5 AS area;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


## Vergleiche, Wahrheitswerte und logische Operatoren

In *SQL* kann man auch mit Wahrheitswerten arbeiten.

```sql
SELECT true, false;
```


Beim Vergleich von zwei Werten erhält man immer einen Wahrheitswert.
Z.B. wird ein Vergleich mit dem Gleichheitsoperator genau dann zu `true`
ausgewertet wenn beide Seiten den gleichen Wert haben.

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

Durch das Schlüsselwert `NOT` wird ein Wahrheitswert verneint.

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

Mit den Schlüsselwörtern `AND` und `OR` können zwei
boolesche Ausdrücke zu einem Ausdrück verknüpft werden.

Bei der Verwendungen von `AND` wird der gesamte Ausdruck genau
dann zu `true` ausgewertet, wenn beide Teilausdrücke zu
`true` ausgewertet werden.

```sql
SELECT 10 > 3 and 2 = 2;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


```sql
SELECT 2 > 1 and 4 != 4;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Werden zwei boolesche Ausdrücke mit `OR` verknüpft, wird der
gesamte Ausdruck genau dann zu `true` ausgewertet, wenn mindestens
einer der Teilausdrücke zu zu `true` ausgewertet wird.

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

In der Mathematik gilt die Punkt vor Strich-Regel. Diese besagt, dass Mal und Geteilt immer vor Plus oder Minus ausgewertet werden.


\\[
1 + 2 \cdot 3 = 1 + 6 = 7
\\]

Wenn die Addtion zuerst ausgewertet werden soll, ist eine Klammer notwendig.
\\[
(1 + 2) \cdot 3 = 3 \cdot 3= 9
\\]


In *SQL* gibt es eine ähnliche Regel. Diese besagt, dass `AND` vor `OR` ausgewertet wird.



```sql
SELECT true OR false AND false;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Auch hier kann mithilfe von Klammern die Reihenfolge vorgegeben werden.

```sql
SELECT (true OR false) AND false;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


## Strings

Ein weiterer Zahlentyp insql sind Zeichenketten (`VARCHAR`). Vergleiche
mit Zeichenketten haben oft ein überraschendes Ergebnis.

```sql
SELECT '10' < '2';
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Der Grund dafür ist, dass Zeichenketten anders verglichen werden, als
wir das von Zahlen kennen. Die Art des Vergleichs nennt sich
lexikalisch. Hierfür vergleicht man zunächst einzelne Buchstaben. Ein
Buchstabe ist größer als ein anderer Buchstabe, wenn dieser im Alphabet
später auftaucht. Zwei Ziffern werden wie Zahlen verglichen. Beim
Vergleich zweier Zeichenketten werden zuerst die Zeichen am Anfang
verglichen. Größer ist der String mit dem größeren ersten Zeichen. Wenn
diese gleich sind, fährt man mit dem nächsten Zeichen fort.



```sql
SELECT 'abc' > 'abd';
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Wenn man am Ende eines Strings angelangt ist, und im zweiten String noch
weitere Zeichen sind, ist der zweite String größer.

```sql
SELECT 'ab' < 'abd';
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

##  Textmustererkennung

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

Daten sind insql ein eigener Datentyp mit dem Namen `DATE`. Sie
werden in Anführungszeichen im Format `yyyy-mm-dd` geschrieben. Die so
geschriebenen Daten können miteinander verglichen werden. Das spätere
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
<codapi-snippet  sandbox="mysql" editor="basic" output-mode="text">
</codapi-snippet>

Mit der Funktion `CURDATE` kann das aktuelle Datum in dem gerade
erklärten Format bestimmt werden.

```sql
SELECT CURDATE();
```
<codapi-snippet  sandbox="mysql" editor="basic" output-mode="text">
</codapi-snippet>
