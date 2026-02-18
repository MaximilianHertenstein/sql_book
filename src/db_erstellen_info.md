# Datenbanken erstellen

## Datenbankschema erstellen und verwenden

In SQL nutzt man Befehle zum Erstellen, Verändern oder Abfragen von
Datenbanken. Hinter jedem Befehl muss ein Semikolon (`;`{.SQL}) stehen.

Mit dem Befehl `CREATE SCHEMA`{.SQL} kann man eine Datenbank erstellen.
Hinter `SCHEMA`{.SQL} folgt der Name der Datenbank.

``` SQL
CREATE SCHEMA Schule;
```

Jetzt können wir die neu erstelle Datenbank mit dem Befehl `USE`{.SQL}
nutzen. Hinter `USE`{.SQL} steht wieder der Name der Datenbank.

``` SQL
USE Schule;
```

## Erstellen von Tabellen

Die neu erstellte Datenbank enthält noch keine Tabellen. Um neue
Tabellen zu erstellen, nutzen wir den Befehl `CREATE TABLE`{.SQL}.

``` SQL
CREATE TABLE klassen (
    klassen_id int,
    stufe varchar(255),
    klasse varchar(255),
    klassenzimmer varchar(255)
    );
```

Hinter `CREATE TABLE`{.SQL} steht der Name der Tabelle. Anschließend
folgen in Klammern die Namen der Spalten mit dem entsprechenden
Datentyp. Diese werden durch Kommas voneinander getrennt.

## Festlegen eines Primärschlüssels

Nach der Angabe der Spalten und deren Datentypen können wir einen
Primärschlüssel festlegen.

``` {.SQL escapeinside="||"}
CREATE TABLE klassen (
    klassen_id int,
    |$\vdots$|
    PRIMARY KEY(klassen_id)
    );
```

Hierfür schreibt man in einer neuen Zeile die Schlüsselwörter
`PRIMARY KEY`{.SQL} und anschließend in Klammern die Spalte, die man als
Primärschlüssel ausgewählt hat.

## Festlegen eines Sekundärschlüssels

Um einen Fremdschlüssel zu definieren, schreibt man hinter die
Schlüsselwörter `FOREIGN KEY`{.SQL} in Klammern die gewünschte Spalte.
Anschließend folgt das Schlüsselwort `REFERENCES`{.SQL}, der Name der
Tabelle aus der der Fremdschlüssel stammt und der Name dieser Spalte in
dieser Tabelle.

``` {.SQL escapeinside="||"}
CREATE TABLE schueler (
    schuelernummer int,
    |$\vdots$|
    klassen_id int,
    PRIMARY KEY(schuelernummer),
    FOREIGN KEY(klassen_id) REFERENCES klassen(klassen_id)
    );
```

## Zeilen Einfügen

Mit dem `INSERT`{.SQL}-Befehl kann eine neue Zeile zu einer Tabelle
hinzugefügt werden. Hinter `INSERT INTO`{.SQL} steht der Tabellenname.
Anschließend folgen in Klammern und durch Kommas getrennt die
Spaltennamen der Tabelle. Nach dem Schlüsselwort `VALUES`{.SQL} folgen
die konkreten Werte, die in diese Spalten eingefügt werden sollen.

``` SQL
INSERT INTO klassen
Values 
(1, '12', 'D', 'H207');
```

    *klassen_id* *stufe*   *klasse*   *klassenzimmer*
  -------------- --------- ---------- -----------------
               1 12        D          H207

\
Wir können auch mehre Zeilen auf einmal in eine Tabelle einfügen, wenn
wir diese durch Kommas trennen.

``` SQL
INSERT INTO klassen
Values 
(2, 'BF1', 'P', 'H205'),
(3, '12', 'TGI', 'G252');
```

    *klassen_id* *stufe*   *klasse*   *klassenzimmer*
  -------------- --------- ---------- -----------------
               1 12        D          H207
               2 BF1       P          H205
               3 12        TGI        G252

\
