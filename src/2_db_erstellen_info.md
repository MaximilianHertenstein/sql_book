# Datenbanken erstellen

## Was sind Datenbanken

Eine Datenbank ist eine strukturierte Sammlung von Informationen. In
einer relationalen Datenbank liegen die Informationen als Tabellen vor.
In jeder Tabelle sind ähnliche Objekte aus der echten Welt gespeichert.
Jede Zeile einer Tabelle steht für ein solches Objekt. Jede Spalte steht
für eine Eigenschaft, die alle Objekte in dieser Tabelle haben.


## Datenbankschema erstellen und verwenden

In SQL nutzt du Befehle zum Erstellen, Verändern und Abfragen von Datenbanken.
Jeder Befehl endet mit einem Semikolon (`;`).

Mit `CREATE SCHEMA` legst du eine Datenbank an.
Hinter `SCHEMA` steht der Name der Datenbank.

```sql
CREATE SCHEMA Schule;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

Mit `USE` wählst du die neu erstellte Datenbank aus.
Auch hier folgt der Datenbankname.

```sql
USE Schule;
```


## Erstellen von Tabellen

Die neue Datenbank enthält zunächst keine Tabellen.
Mit `CREATE TABLE` legst du neue Tabellen an.

```sql
CREATE TABLE klassen (
    klassen_id int,
    stufe varchar(255),
    klasse varchar(255),
    klassenzimmer varchar(255)
    );
```


Hinter `CREATE TABLE` steht der Tabellenname.
Danach folgen in Klammern die Spaltennamen mit Datentypen.
Die Spaltendefinitionen trennst du durch Kommas.

## Festlegen eines Primärschlüssels

Nach den Spaltendefinitionen legst du den Primärschlüssel fest.

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

Dafür schreibst du `PRIMARY KEY` und in Klammern die gewählte Spalte.

## Festlegen eines Fremdschlüssels

Für einen Fremdschlüssel schreibst du hinter `FOREIGN KEY` die lokale Spalte in Klammern.
Danach folgen `REFERENCES`, die referenzierte Tabelle und deren Spalte.

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

## Zeilen einfügen

Mit `INSERT` fügst du neue Zeilen in eine Tabelle ein.
Hinter `INSERT INTO` steht der Tabellenname.
Nach `VALUES` folgen die konkreten Werte in der Reihenfolge der Spalten.

```sql
INSERT INTO klassen
VALUES
(1, '12', 'D', 'H207');
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Mit dem folgenden Befehl zeigst du die geänderte Tabelle an.

```sql
SELECT * FROM klassen;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>


Du kannst auch mehrere Zeilen in einem Statement einfügen.
Trenne die Tupel dafür mit Kommas.

```sql
INSERT INTO klassen
VALUES
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