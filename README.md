# TypeScript World Clock

Individuell uppgift för TypeScript-kurs

## Dokumentation:

### Hur tänkte du när du skissade gränssnitt? Gärna länk till skisser.

Min tanke när jag skapade designen för applikationen var att göra den så simpel som möjligt men ändå ha den viktiga funktionaliteten som behövs.
Inga flashiga effekter eller färger som drar undan uppmärksamheten.
[Skiss i figma](https://www.figma.com/design/KISlqnQu7GGQJLBUrt1dMY/World-Clock?node-id=0-1&t=rC8aZItIM7N4qQNY-1)

---

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

---

### Funktioner utanför komponenter

**useLocalStorage**: Custom hook för localStorage-hantering

**useTime**: Custom hook för tidsuppdatering

**getTimeForZone**: Tidsberäkningsfunktion (ren logik)

**typeGuards**: Validering av data från localStorage

---

### Vilka typer och interfaces har du valt att lägga i egna filer för återanvändning?

**1. TimeZoneString - Union Type**

```ts
export type TimeZoneString =
  | "Europe/Stockholm"
  | "Europe/London"
  | "America/New_York"
  // ... (fler tidszoner)
  | string;
```

Återanvändning: Används i City interface och CityPicker komponenten för att säkerställa giltiga tidszon-strängar.

**2. City - Interface**

```ts
export interface City {
  id: string;
  name: string;
  country?: string;
  timezone: TimeZoneString;
  offset?: string;
  dstOffset?: string;
  coordinates?: { lat: number; lng: number };
  imageUrl?: string;
  mode?: ClockMode;
}
```

Återanvändning: Denna används i 5+ filer:

- App.tsx - för selectedCities state
- TimeCard.tsx - som props type
- CityDetail.tsx - för city data
- CityPicker.tsx - för skapande av nya städer
- useLocalStorage.ts - generisk typing

**3. StoredCity - Utility Type**

```ts
export type StoredCity = Omit<City, "coordinates" | "imageUrl">;
```

Återanvändning: Används för localStorage-lagring där koordinater och bilder inte sparas (i CityDetail.tsx och CityPicker.tsx).

**4. ClockMode - Union Type**

```ts
export type ClockMode = "analog" | "digital";
```

Återanvändning: Används i CityDetail.tsx för state och i City interface.

### Varför just dessa typer separerades:

**Bra designval**:

1. Centraliserad typhantering - Alla komponenter importerar från samma källa
2. Konsistens - Samma City struktur överallt i applikationen
3. Utility types - StoredCity visar smart användning av TypeScripts Omit
4. Union types - ClockMode och TimeZoneString begränsar tillåtna värden

---

### TypeScript-fördelar jämfört med JavaScript

**1. Typesäkerhet med interfaces och type definitions.**

```ts
export interface City {
  id: string;
  name: string;
  country?: string;
  timezone: TimeZoneString;
  offset?: string;
  dstOffset?: string;
  coordinates?: { lat: number; lng: number };
  imageUrl?: string;
  mode?: ClockMode;
}

export type StoredCity = Omit<City, "coordinates" | "imageUrl">;
export type ClockMode = "analog" | "digital";
```

I JavaScript skulle dessa objekt vara "any"-typ utan struktur. TypeScript säkerställer att:

- Alla City-objekt har rätt struktur
- coordinates måste ha "lat" och "lng" som numbers
- mode kan bara vara "analog" eller "digital"
- Man får autocomplete och compile-time fel om du använder fel egenskaper

**2. Generiska hooks med typsäkerhet**

```ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    // ...
  });

  // Type assertion at end ensures correct tuple type
  return [state, setState] as const;
}
```

Den generiska <T>-typen gör att:

- Hooken behåller typsäkerheten för alla datatyper
- När man använder "useLocalStorage<City[]>" vet TypeScript att state är "City[] as const" säkerställer att returvärdet behandlas som en read only tuple
- I JavaScript skulle man förlora all typinformation och få runtime-fel

**3. Type Guards för runtime-validering**

```ts
export function isCity(obj: any): obj is City {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.timezone === "string"
  );
}
```

Type guards kombinerar runtime-validering med compile-time typsäkerhet:

- Validerar att okänd data (från localStorage/API) matchar City-interfacet
- Efter isCity()-kontroll "vet" TypeScript att objektet är en City
- I JavaScript skulle man bara ha runtime-kontroller utan typinformation
- Används i CityDetail.tsx för att säkert filtrera lagrad data

### Beskriv hur TypeScript transpileras till JavaScript i ditt projekt

I mitt Vite+React-projekt transpileras TypeScript till JavaScript i realtid under utveckling: TypeScript-kompilatorn analyserar din kod för typfel, sedan konverterar Vite (med esbuild) .tsx-filerna till ren JavaScript genom att ta bort all typinformation och TS-specifik syntax, samtidigt som den behåller JSX och modern JavaScript. I produktion optimeras koden ytterligare med tree-shaking och minifiering, men alla typer försvinner - de finns endast kvar som säkerhetsnät under utveckling.

---

## Loggbok för TypeScript individuell uppgift - World Clock

### Dag 1

Skapade en "kanban" i github projects och lade till några user stories. Använde Vite för att skapa ett React-projekt med TypeScript.

### Dag 2

Skissade på design
Hittade en Analog klocka gjort för React med Typescript som jag lade i en egen komponent.

### Dag 3-5

Började skapa applikationen så att den såg ut som min design.
Skapade grundmässig kod så att det funkade att ta data från .JSON-fil och visa den informationen på sidan.
Såg till så att klockan visades och att den visade rätt tid beroende på vald stad.
