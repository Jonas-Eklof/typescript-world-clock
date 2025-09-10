# TypeScript World Clock

Individuell uppgift för TypeScript-kurs

## Dokumentation:

### Hur tänkte du när du skissade gränssnitt? Gärna länk till skisser.

Min tanke när jag skapade designen för applikationen var att göra den så simpel som möjligt men ändå ha den viktiga funktionaliteten som behövs.
Inga flashiga effekter eller färger som drar undan uppmärksamheten.
[Skiss i figma](https://www.figma.com/design/KISlqnQu7GGQJLBUrt1dMY/World-Clock?node-id=0-1&t=rC8aZItIM7N4qQNY-1)

### Hur har du valt att dela upp din applikation?

Jag hade "_separation of concerns_" i åtanke när jag skapade min app för att göra den lätt att felsöka och underhålla.

Komponentuppdelning:
**App**: Root-komponent, hanterar routing och global state

**Header**: Navigering och "Lägg till stad"-knapp

**StartScreen**: Välkomstskärm när inga städer är valda

**Modal**: Återanvändbar modal-komponent

**CityPicker**: Lista och sökning av städer

**TimeCard**: Individuell stadsklocka (både analog/digital)

**CityDetail**: Detaljvy för enskild stad

**AnalogClock & DigitalClock**: Tidsvisningskomponenter

#### Funktioner utanför komponenter

**useLocalStorage**: Custom hook för localStorage-hantering

**useTime**: Custom hook för tidsuppdatering

**getTimeForZone**: Tidsberäkningsfunktion (ren logik)

**typeGuards**: Validering av data från localStorage

#### Vilka typer och interfaces har du valt att lägga i egna filer för återanvändning?

```ts
export type TimeZoneString = /*...*/; // String literal types
export interface City { /*...*/ }      // Stadsobjekt
export interface CityListFile { /*...*/ } // JSON-filstruktur
export type ClockMode = "analog" | "digital"; // Union type
```

**Enkel import/export**: En central plats för alla typer
**Undvika circular dependencies**: Komponenter importerar typer, inte tvärtom
**Typ-säkerhet**: Konsekvent användning i hela appen
**Underhållbarhet**: Enkelt att uppdatera typer på ett ställe

## Loggbok för TypeScript individuell uppgift - World Clock

### Dag 1

Skapade en "kanban" i github projects och lade till några user stories. Använde Vite för att skapa ett React-projekt med TypeScript.

### Dag 2

Skissade på design
Hittade en Analog klocka gjort för React med Typescript som jag lade i en egen komponent.
