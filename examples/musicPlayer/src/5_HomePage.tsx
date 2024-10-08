import { useAccount } from "./2_main";
import { MediaPlayer } from "./4_useMediaPlayer";
import { Link } from "./basicComponents/Link";
import { MusicTrackRow } from "./components/MusicTrackRow";
import { usePlayState } from "./lib/audio/usePlayState";

export function HomePage({ mediaPlayer }: { mediaPlayer: MediaPlayer }) {
    const { me } = useAccount({
        root: {
            rootPlaylist: {
                tracks: [{}],
            },
            playlists: [{}],
        },
    });

    const tracks = me?.root.rootPlaylist.tracks;

    const playState = usePlayState();
    const isPlaying = playState.value === "play";

    const playlists = me?.root.playlists;

    return (
        <>
            {playlists && playlists.length > 0 && (
                <div className="p-3">
                    <b>Playlists</b>
                    <div className="flex py-6 gap-6">
                        {playlists.map((playlist) => (
                            <Link
                                key={playlist.id}
                                to={`/playlist/${playlist.id}`}
                            >
                                {playlist.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <ul className="flex flex-col">
                {tracks?.map(
                    (track) =>
                        track && (
                            <MusicTrackRow
                                track={track}
                                key={track.id}
                                isLoading={mediaPlayer.loading === track.id}
                                isPlaying={
                                    mediaPlayer.activeTrack?.id === track.id &&
                                    isPlaying
                                }
                                onClick={mediaPlayer.setActiveTrack}
                            />
                        ),
                )}
            </ul>
        </>
    );
}
