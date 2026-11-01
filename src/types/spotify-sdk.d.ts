// Minimal types for the Spotify Web Playback SDK (https://sdk.scdn.co/spotify-player.js).
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify?: typeof Spotify;
  }

  namespace Spotify {
    interface PlayerInit {
      name: string;
      getOAuthToken: (cb: (token: string) => void) => void;
      volume?: number;
    }

    interface Artist {
      name: string;
      uri: string;
    }

    interface Track {
      uri: string;
      name: string;
      artists: Artist[];
      duration_ms: number;
    }

    interface PlaybackState {
      paused: boolean;
      position: number;
      duration: number;
      shuffle: boolean;
      repeat_mode: 0 | 1 | 2;
      track_window: { current_track: Track | null };
    }

    interface PlayerError {
      message: string;
    }

    type ErrorEvent = 'initialization_error' | 'authentication_error' | 'account_error' | 'playback_error';

    class Player {
      constructor(options: PlayerInit);
      connect(): Promise<boolean>;
      disconnect(): void;
      addListener(event: 'ready' | 'not_ready', cb: (data: { device_id: string }) => void): boolean;
      addListener(event: 'player_state_changed', cb: (state: PlaybackState | null) => void): boolean;
      addListener(event: ErrorEvent, cb: (error: PlayerError) => void): boolean;
      activateElement(): Promise<void>;
      pause(): Promise<void>;
      resume(): Promise<void>;
      seek(positionMs: number): Promise<void>;
      previousTrack(): Promise<void>;
      nextTrack(): Promise<void>;
      setVolume(volume: number): Promise<void>;
    }
  }
}

export {};
