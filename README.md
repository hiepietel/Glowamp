# Glowamp

Odtwarzacz w przeglądarce w stylu klasycznych odtwarzaczy MP3 z lat 90., który gra muzykę z Twojego konta Spotify.

React + TypeScript + Vite + Tailwind CSS.

## Wymagania

- Konto **Spotify Premium** (Spotify nie pozwala odtwarzać muzyki w zewnętrznych aplikacjach na darmowym koncie).
- Node.js 20+.

## Konfiguracja (jednorazowo)

1. Wejdź na https://developer.spotify.com/dashboard i kliknij **Create app**.
2. W polu **Redirect URI** wpisz dokładnie: `http://127.0.0.1:8888/`
   (Spotify nie akceptuje `localhost`, tylko `127.0.0.1`).
3. Zaznacz **Web API** i **Web Playback SDK**, zapisz.
4. Skopiuj plik `.env.example` jako `.env.local` i wklej **Client ID** do `VITE_SPOTIFY_CLIENT_ID`.
5. Jeśli chcesz, żeby ktoś inny też mógł się zalogować, dodaj jego e-mail w **User Management**
   (w trybie deweloperskim Spotify pozwala na kilku testowych użytkowników).

## Uruchomienie

Kliknij dwukrotnie `start.bat` albo:

```
npm install
npm run dev
```

i otwórz http://127.0.0.1:8888/

| Polecenie | Co robi |
|---|---|
| `npm run dev` | serwer deweloperski |
| `npm run build` | sprawdzenie typów + build do `dist/` |
| `npm run typecheck` | tylko sprawdzenie typów |
| `npm run preview` | podgląd buildu |

## Sterowanie

| Klawisz | Akcja |
|---|---|
| Z / X / C / V / B | poprzedni / graj / pauza / stop / następny |
| S / R | losowo / powtarzanie |
| L | wyszukiwanie |
| Dwuklik na utworze, Enter | odtwórz |
| Klik na czasie | czas pozostały |

## Struktura (atomic design)

```
src/
  components/
    atoms/       Icon, TransportButton, ToggleButton, Lamp, Badge, Grip,
                 RangeSlider, TextInput, Select, Visualizer, Toast
    molecules/   TitleBar, Window, TimeDisplay, Marquee, StatusLamps, VolumeControl,
                 SeekBar, TransportControls, PlaybackModes, SearchForm, SourceSelect,
                 TrackRow, AccountBar, ListMessage
    organisms/   MainWindow, PlaylistWindow, TrackList
    templates/   PlayerTemplate
    pages/       PlayerPage
  hooks/         useGlowamp (spina całość), useAuth, useSpotifyPlayer, useLibrary, ...
  services/      auth.ts (logowanie PKCE), spotifyApi.ts (Web API)
  types/         typy aplikacji i Spotify Web Playback SDK
  index.css      motyw Tailwind (kolory, czcionki, ramki)
```

Każdy komponent ma własny folder:

```
Button/
  Button.tsx         komponent
  Button.props.ts    typy propsów
  Button.styles.ts   klasy Tailwind
  index.ts           eksport
```

Klasy w `*.styles.ts` muszą być pełnymi napisami — Tailwind nie widzi klas sklejanych w locie.

## Ograniczenia

- Analizator widma jest tylko ozdobą: Spotify nie udostępnia surowego dźwięku, więc nie da się zrobić prawdziwej wizualizacji ani korektora.
- Spotify pokazuje listę utworów tylko dla Twoich własnych playlist. Obserwowane playlisty można odtworzyć w całości przyciskiem ▶.
- Wyszukiwarka zwraca do 10 wyników (limit Spotify w trybie deweloperskim).
