'use client';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './player-content';

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div className="fixed bottom-0 h-20 w-full bg-black px-4 py-2">
            {/* hook doesn't support dynamic url changes so need to use key to make it rerender */}
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
};

export default Player;
