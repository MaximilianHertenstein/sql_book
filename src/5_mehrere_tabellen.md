# Abfragen über mehrere Tabellen

## Primär- und Fremdschlüssel

Manche Informationen sind über mehre Tabellen verteilt. Z. B. benötigt
man die Tabelle *Fahrradarten* wenn man zu einem Fahrrad aus der Tabelle
*Fahrraeder* die Bezeichnung der Fahrradart herausfinden will. Um damit
arbeiten zu können, muss man die Konzepte *Primär-* und *Fremdschlüssel*
kennen. In jeder Tabelle einer Datenbank gibt es einen sogenannten
*Primärschlüssel*. Dies ist ein Attribut[^1] anhand dessen die Objekte
in der Tabelle eindeutig identifizierbar sind. In Diagrammen werden die
Primärschlüssel oft mit einem Schlüsselsymbol gekennzeichnet. Z. B. ist
jedes Fahrrad eindeutig durch das Attribut *FahrradNr* gekennzeichnet.

<figure id="fig:DB_Fahrrad_2_Tabellen" data-latex-placement="h!">
<img src="erm_fahrrad_2_tabellen" style="width:40.0%" />
<figcaption>Ausschnitt der Datenbank eines Fahrradverleihs</figcaption>
</figure>

Wenn man zwei Tabellen miteinander verbinden möchte, kann man den
Primärschlüssel der einen Tabelle in die andere Tabelle aufnehmen. Den
aufgenommenen Schlüssel bezeichnet man dann als *Fremdschlüssel*. Z. B.
ist in der Beispieldatenbank der Primärschlüssel der Tabelle
*Fahrradarten* ein Fremdschlüssel in der Tabelle *Fahrraeder*.

Jedes Fahrrad hat einen Eintrag in der Spalte *FahradartNr*[^2]. In der
Tabelle *Fahrradarten* gibt es genau eine Zeile, die diesen Eintrag als
Primärschlüssel besitzt. Durch diese Verbindung kann man zu einem
Fahrrad die *Bezeichnung* und *Kurzerläuterung* der *Fahrradart*
herausfinden. Diese Verbindungen sind in beiden folgenden Tabellen
farbig markiert.

::: minipage
...
:::

::: minipage
...
:::

Umgekehrt kann man auch herausfinden, welche Fahrräder zu einer
Fahrradart gehören. Hierfür schaut man welche *Fahrräder* den
entsprechenden Wert in der Spalte *FahrradartNr* haben. Aus dem Diagramm
kann man jedoch einen wichtigen Unterschied zwischen den beiden
Richtungen herauslesen. Die Zahl $1$ und das Zeichen $\infty$(Unendlich)
auf der Verbindung zwischen den Tabellen *Fahrradarten* und *Fahrraeder*
sagen aus, dass es zu einer Fahrradart beliebig viele Fahrräder geben
kann. Ein bestimmtes Fahrrad gehört aber nur zu genau einer Fahrradart.

## Abfragen über mehrere Tabellen

Wir haben gerade gesehen, dass man Fremdschlüssel dazu nutzen kann, um
Informationen aus mehreren Tabellen zu kombinieren. Diese Verbindungen
können auch in einer einzigen SQL-Abfrage genutzt werden. Hierfür
schreibt man die Tabellen in einem `SELECT`-*Statement* mit Kommas
getrennt hinter `FROM`.

Wenn man z. B. die Bezeichnung jedes Fahrrads zusammen mit der
Bezeichnung der Fahrradart anzeigen will, benötigt man die Tabellen
*Fahrradarten* und *Fahrraeder*. Wenn in den Tabellen zwei Spalten mit
den selben Namen vorkommen, muss man den Tabellen in der
`FROM`-Klausel verschiedene Namen geben. Diese schreibt man hinter
die Namen der Tabellen. Anschließend kann man auf die Werte in den
Spalten zugreifen, indem man hinter den neuen Tabellennamen einen Punkt
und den Namen der Spalte schreibt. Um die Spalten im Ergebnis
auseinander halten zu können müssen diese mit `AS` umbenannt
werden.

```sql
SELECT FA.bezeichnung AS Fahrradartbezeichnung, F.bezeichnung AS Fahrradbezeichnung
FROM Fahrradarten FA, Fahrraeder F;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

        *\#* *Fahrradartbezeichnung*        *Fahrradbezeichnung*
  ---------- ------------------------------ ----------------------
           1 Mountain-Bike                  Comus Einrad
           2 Cross-Bike                     Comus Einrad
    $\vdots$ $\vdots$                       $\vdots$
           5 Einrad                         Comus Einrad
           6 Tandem                         Comus Einrad
    $\vdots$ $\vdots$                       $\vdots$
           9 Kinderrad Fahrrad 12-18 Zoll   Comus Einrad
          10 Jugendfahrrad ab 26 Zoll       Comus Einrad
    $\vdots$ $\vdots$                       $\vdots$
          15 Mountain-Bike                  Panther Thedy
          16 Cross-Bike                     Panther Thedy
    $\vdots$ $\vdots$                       $\vdots$
          19 Einrad                         Panther Thedy
          20 Tandem                         Panther Thedy
    $\vdots$ $\vdots$                       $\vdots$

Das Ergebnis macht schon auf den ersten Blick wenig Sinn. Das *Comus
Einrad* ist sicher nicht gleichzeitig ein *Mountain-Bike* und ein
*Cross-Bike*. Der Grund für dieses überraschende Ergebnis ist, dass jede
*Bezeichnung* aus der Tabelle *Fahrradarten* mit jeder *Bezeichnung* aus
der Tabelle *Fahrraeder* kombiniert wurde. Um zu jedem Fahrrad nur die
korrekte Fahrradart anzuzeigen, müssen wir ausnutzen, dass die Spalte
*FahrradartNr* in beiden Tabellen vorkommt.

::: minipage
...
:::

::: minipage
...\
:::

Im Ergebnis sollten die Zeilen aus der Tabelle *Fahrraeder* nur mit den
Zeilen aus der Tabelle *Fahrradarten* kombiniert werden, bei denen der
Wert in den Spalten mit dem Namen *fahrradartNr* übereinstimmt. Dies
wird mit der folgenden Abfrage realisiert.

```sql
SELECT FA.bezeichnung AS Fahrradartbezeichnung, F.bezeichnung AS Fahrradbezeichnung
WHERE FA.fahrradartNr = F.fahrradartNr;
```
<codapi-snippet engine="pglite" sandbox="postgres" editor="basic" output-mode="table">
</codapi-snippet>

  *\#*       *Fahrradartbezeichnung*        *Fahrradbezeichnung*
  ---------- ------------------------------ ----------------------
  1          Einrad                         Comus Einrad
  2          Kinderrad Fahrrad 12-18 Zoll   Panther Thedy
  3          Kinderrad Fahrrad 12-18 Zoll   Scott Comtessa
  4          Kinderrad Fahrrad 12-18 Zoll   Scott Voltage Jr 16
  5          Jugendfahrrad ab 26 Zoll       Yazoo FSV-3.6N
  6          Mountain-Bike                  Scott Aspect 50
  7          Jugendfahrrad ab 26 Zoll       Yazoo FSV-3.6N
  8          Einrad                         Comus Einrad XM
  $\vdots$   $\vdots$                       $\vdots$

\

[^1]: oder eine Menge von Attributen

[^2]: Zumindest wenn die Datenbank fehlerfrei ist. Mit Fehlern in
    Datenbanken werden wir uns später beschäftigen.
