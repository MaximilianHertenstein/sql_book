# Datenbanken erstellen

## Was sind Datenbanken

Eine Datenbank ist eine strukturierte Sammlung von Informationen. In
einer relationalen Datenbank liegen die Informationen als Tabellen vor.
In jeder Tabelle sind ähnliche Objekte aus der echten Welt gespeichert.
Jede Zeile einer Tabelle steht für ein solches Objekt. Jede Spalte steht
für eine Eigenschaft, die alle Objekte in dieser Tabelle haben. 


## Datenbankschema erstellen und verwenden

In SQL nutzt man Befehle zum Erstellen, Verändern oder Abfragen von
Datenbanken. Hinter jedem Befehl muss ein Semikolon (`;`) stehen.

Mit dem Befehl `CREATE SCHEMA` kann man eine Datenbank erstellen.
Hinter `SCHEMA` folgt der Name der Datenbank.

```sql
CREATE SCHEMA Schule;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Jetzt können wir die neu erstelle Datenbank mit dem Befehl `USE`
nutzen. Hinter `USE` steht wieder der Name der Datenbank.

```sql
USE Schule;
```


## Erstellen von Tabellen

Die neu erstellte Datenbank enthält noch keine Tabellen. Um neue
Tabellen zu erstellen, nutzen wir den Befehl `CREATE TABLE`.

```sql
CREATE TABLE klassen (
    klassen_id int,
    stufe varchar(255),
    klasse varchar(255),
    klassenzimmer varchar(255)
    );
```


Hinter `CREATE TABLE` steht der Name der Tabelle. Anschließend
folgen in Klammern die Namen der Spalten mit dem entsprechenden
Datentyp. Diese werden durch Kommas voneinander getrennt.

## Festlegen eines Primärschlüssels

Nach der Angabe der Spalten und deren Datentypen können wir einen
Primärschlüssel festlegen.

```sql
CREATE TABLE klassen (
    klassen_id int,
    stufe varchar(255),
    klasse varchar(255),
    klassenzimmer varchar(255),
    PRIMARY KEY(klassen_id)
    );
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Hierfür schreibt man in einer neuen Zeile die Schlüsselwörter
`PRIMARY KEY` und anschließend in Klammern die Spalte, die man als
Primärschlüssel ausgewählt hat.

## Festlegen eines Sekundärschlüssels

Um einen Fremdschlüssel zu definieren, schreibt man hinter die
Schlüsselwörter `FOREIGN KEY` in Klammern die gewünschte Spalte.
Anschließend folgt das Schlüsselwort `REFERENCES`, der Name der
Tabelle aus der der Fremdschlüssel stammt und der Name dieser Spalte in
dieser Tabelle.

```sql
CREATE TABLE schueler (
    schuelernummer int,
    klassen_id int,
    PRIMARY KEY(schuelernummer),
    FOREIGN KEY(klassen_id) REFERENCES klassen(klassen_id)
    );
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

## Zeilen Einfügen

Mit dem `INSERT`-Befehl kann eine neue Zeile zu einer Tabelle
hinzugefügt werden. Hinter `INSERT INTO` steht der Tabellenname.
Anschließend folgen in Klammern und durch Kommas getrennt die
Spaltennamen der Tabelle. Nach dem Schlüsselwort `VALUES` folgen
die konkreten Werte, die in diese Spalten eingefügt werden sollen.

```sql
INSERT INTO klassen
Values 
(1, '12', 'D', 'H207');
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Die geänderte Tabelle können wir mit dem folgenden Befehl anzeigen.

```sql
SELECT * FROM klassen;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Wir können auch mehre Zeilen auf einmal in eine Tabelle einfügen, wenn
wir diese durch Kommas trennen.

```sql
INSERT INTO klassen
Values 
(2, 'BF1', 'P', 'H205'),
(3, '12', 'TGI', 'G252');
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


```sql
SELECT * FROM klassen;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>