# Glowamp

A browser player styled after classic 90s MP3 players that plays music from your Spotify account.

React + TypeScript + Vite + Tailwind CSS.

Live: https://hiepietel.github.io/Glowamp/

## Requirements

- A **Spotify Premium** account (Spotify doesn't allow playback in third-party apps on free accounts).
- Node.js 20.19+ (CI uses 24).

## Setup (one time)

1. Go to https://developer.spotify.com/dashboard and click **Create app**.
2. Add these **Redirect URIs** exactly as written:
   - `http://127.0.0.1:8888/` for local development (Spotify rejects `localhost`, only `127.0.0.1` works),
   - `https://hiepietel.github.io/Glowamp/` for GitHub Pages.
3. Tick **Web API** and **Web Playback SDK**, then save.
4. Copy `.env.example` to `.env.local` and paste the **Client ID** into `VITE_SPOTIFY_CLIENT_ID`.
5. While the app is in development mode, only accounts listed under **User Management** can log in.
   Add the email of anyone else who should be able to use it.

## Running locally

```
npm install
npm run dev
```

and open http://127.0.0.1:8888/

| Command | What it does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | type check + production build into `dist/` |
| `npm run typecheck` | type check only |
| `npm run preview` | serve the production build |

## Deploying to GitHub Pages

Every push to `main` builds the app and publishes it via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
One-time setup in the GitHub repository:

1. **Settings → Pages → Source:** choose **GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables → New repository variable:**
   name `VITE_SPOTIFY_CLIENT_ID`, value = your Client ID.
   The Client ID ends up in the page's JavaScript anyway (normal for PKCE login without a server), so a variable is enough.
3. Make sure `https://hiepietel.github.io/Glowamp/` is in the Spotify app's Redirect URIs.

The site lives under `/Glowamp/`, which is set as `base` in [vite.config.ts](vite.config.ts) for production builds.
If the repository is renamed, update it there too.

## Controls

| Key | Action |
|---|---|
| Z / X / C / V / B | previous / play / pause / stop / next |
| S / R | shuffle / repeat |
| L | search |
| Double-click a track, Enter | play |
| Click the time | toggle remaining time |

## Structure (atomic design)

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
  hooks/         useGlowamp (ties everything together), useAuth, useSpotifyPlayer, useLibrary, ...
  services/      auth.ts (PKCE login), spotifyApi.ts (Web API)
  types/         app types and Spotify Web Playback SDK types
  index.css      Tailwind theme (colors, fonts, bevels)
```

Every component has its own folder:

```
Button/
  Button.tsx         component
  Button.props.ts    prop types
  Button.styles.ts   Tailwind classes
  index.ts           exports
```

Classes in `*.styles.ts` must be complete strings. Tailwind can't detect class names that are built at runtime.

## Limitations

- The spectrum analyzer is decorative only. Spotify doesn't expose raw audio, so a real visualizer or equalizer isn't possible.
- Spotify returns track lists only for your own playlists. Followed playlists can still be played as a whole with ▶.
- Search returns up to 10 results (Spotify's limit in development mode).
- The interface text is in Polish.
