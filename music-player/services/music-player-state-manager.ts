import {isNotNullAndUndefined, isNullOrUndefined, Ts} from "@miniskylab/antimatter-framework";
import {SongRow} from "../components";
import {RepeatMode} from "../enums";

export const MusicPlayerStateManager = new class
{
    private _indexedTracklist: Record<string, SongRow.SongData>;
    private _playQueue: string[];
    private _playingSongIndex: number | undefined;
    private _isPlaying: boolean;
    private _secPlaybackProgress: number | undefined;
    private _isShuffleEnabled: boolean;
    private _repeatMode: RepeatMode;

    constructor() { this.resetState(); }

    resetState(newState?: {
        indexedTracklist?: Record<string, SongRow.SongData>,
        playQueue?: string[],
        playingSongIndex?: number,
        isPlaying?: boolean,
        secPlaybackProgress?: number,
        isShuffleEnabled?: boolean,
        repeatMode?: RepeatMode
    })
    {
        this._indexedTracklist = newState?.indexedTracklist ?? {};
        this._playQueue = newState?.playQueue ?? [];
        this._playingSongIndex = newState?.playingSongIndex;
        this._isPlaying = newState?.isPlaying ?? false;
        this._secPlaybackProgress = newState?.secPlaybackProgress;
        this._isShuffleEnabled = newState?.isShuffleEnabled ?? false;
        this._repeatMode = newState?.repeatMode ?? RepeatMode.None;
    }

    getState()
    {
        return {
            indexedTracklist: this._indexedTracklist,
            playQueue: this._playQueue,
            playingSongIndex: this._playingSongIndex,
            isPlaying: this._isPlaying,
            secPlaybackProgress: this._secPlaybackProgress,
            isShuffleEnabled: this._isShuffleEnabled,
            repeatMode: this._repeatMode
        };
    }

    playSongNamed(toBePlayedSongName: string)
    {
        const toBePlayedSongUri = this.getSongUriByName(toBePlayedSongName);
        if (!toBePlayedSongUri)
        {
            this._secPlaybackProgress = undefined;
            return;
        }

        const lastPlayedSongIndex = this._playingSongIndex === Infinity
            ? this._playQueue.length - 1
            : this._playingSongIndex;

        const lastPlayedSongUri = this.getSongUriBySongIndex(lastPlayedSongIndex);
        if (toBePlayedSongUri === lastPlayedSongUri)
        {
            this._playingSongIndex = lastPlayedSongIndex;
            this._secPlaybackProgress = undefined;
            this._isPlaying = true;

            return;
        }

        this.clearPlayQueueStartingFrom(lastPlayedSongIndex);
        this._playQueue.push(toBePlayedSongUri);
        this._playingSongIndex = this._playQueue.length - 1;

        if (this._isShuffleEnabled)
        {
            this._playQueue.push(...this.getUpcomingSongUris(toBePlayedSongUri));
        }

        this._secPlaybackProgress = undefined;
        this._isPlaying = true;
    }

    playNext()
    {
        if (isNullOrUndefined(this._playingSongIndex) || this._playingSongIndex === Infinity)
        {
            this._secPlaybackProgress = undefined;
            this._isPlaying = false;
            return;
        }

        const toBePlayedSongIndex = this.searchPlayQueueForTheFirstNonExcludedSongIndex(this._playingSongIndex);
        if (isNotNullAndUndefined(toBePlayedSongIndex) && toBePlayedSongIndex < this._playQueue.length)
        {
            this._playingSongIndex = toBePlayedSongIndex;
            this._secPlaybackProgress = undefined;
            this._isPlaying = true;

            return;
        }

        const playableTrackUris = this.getTrackUris(true);
        if (playableTrackUris.length <= 0)
        {
            this._secPlaybackProgress = undefined;
            this._playingSongIndex = undefined;
            this._isPlaying = false;

            return;
        }

        const playingSongUri = this.getSongUriBySongIndex(this._playingSongIndex);
        if (!this._isShuffleEnabled)
        {
            const playingTrackIndex = this.getTrackIndex(playingSongUri);
            if (isNotNullAndUndefined(playingTrackIndex))
            {
                const trackUris = this.getTrackUris();
                const toBePlayedTrackIndex = this.searchTracklistForTheFirstNonExcludedTrackIndex(playingTrackIndex);
                if (isNotNullAndUndefined(toBePlayedTrackIndex))
                {
                    this._playQueue.push(trackUris[toBePlayedTrackIndex]);
                    this._secPlaybackProgress = undefined;
                    this._playingSongIndex += 1;
                    this._isPlaying = true;

                    return;
                }
                else if (this._repeatMode === RepeatMode.All)
                {
                    this._playQueue.push(playableTrackUris[0]);
                    this._secPlaybackProgress = undefined;
                    this._playingSongIndex += 1;
                    this._isPlaying = true;

                    return;
                }
            }
        }
        else if (this._repeatMode === RepeatMode.All)
        {
            const upcomingSongUris = this.getUpcomingSongUris(playingSongUri);
            if (upcomingSongUris.length > 0)
            {
                this._playQueue.push(...upcomingSongUris);
                this._secPlaybackProgress = undefined;
                this._playingSongIndex += 1;
                this._isPlaying = true;

                return;
            }
        }

        this._secPlaybackProgress = undefined;
        this._playingSongIndex = Infinity;
        this._isPlaying = false;
    }

    playPrevious()
    {
        if (isNullOrUndefined(this._playingSongIndex))
        {
            this._secPlaybackProgress = undefined;
            this._isPlaying = false;

            return;
        }

        if (this._isShuffleEnabled)
        {
            const firstNonExcludedSongIndex = this.searchPlayQueueForTheFirstNonExcludedSongIndex(this._playingSongIndex, true);
            if (isNotNullAndUndefined(firstNonExcludedSongIndex))
            {
                this._playingSongIndex = firstNonExcludedSongIndex;
                this._secPlaybackProgress = undefined;
                this._isPlaying = true;

                return;
            }
        }
        else
        {
            const playingSongUri = this.getSongUriBySongIndex(this._playingSongIndex);
            const playingTrackIndex = this._playingSongIndex !== Infinity
                ? this.getTrackIndex(playingSongUri)
                : Infinity;

            if (isNotNullAndUndefined(playingTrackIndex))
            {
                const trackUris = this.getTrackUris();
                const firstNonExcludedTrackIndex = this.searchTracklistForTheFirstNonExcludedTrackIndex(playingTrackIndex, true);
                if (isNotNullAndUndefined(firstNonExcludedTrackIndex))
                {
                    const firstNonExcludedTrackUri = trackUris[firstNonExcludedTrackIndex];
                    this._playQueue.push(firstNonExcludedTrackUri);
                    this._playingSongIndex = this._playQueue.length - 1;
                    this._secPlaybackProgress = undefined;
                    this._isPlaying = true;

                    return;
                }
            }
        }

        this._secPlaybackProgress = undefined;
        this._secPlaybackProgress = undefined;
        this._isPlaying = false;
    }

    setIndexedTracklist(indexedTracklist: Record<string, SongRow.SongData>)
    {
        this._indexedTracklist = indexedTracklist ?? {};
        this._playQueue = [];
        this._playingSongIndex = undefined;
        this._isPlaying = false;
        this._secPlaybackProgress = undefined;
    }

    setRepeatMode(newRepeatMode: RepeatMode)
    {
        this._repeatMode = newRepeatMode ?? RepeatMode.None;
    }

    setPlaybackProgress(secPlaybackProgress: number)
    {
        this._secPlaybackProgress = isNullOrUndefined(this._playingSongIndex) || !isFinite(this._playingSongIndex)
            ? undefined
            : secPlaybackProgress === Infinity
                ? this._indexedTracklist[this._playQueue[this._playingSongIndex]].secSongDuration
                : isNotNullAndUndefined(secPlaybackProgress) && !isNaN(secPlaybackProgress) && secPlaybackProgress >= 0
                    ? secPlaybackProgress
                    : 0;
    }

    setIsPlaying(isPlaying: boolean | null | undefined)
    {
        if (isNullOrUndefined(this._indexedTracklist) || Object.keys(this._indexedTracklist).length === 0)
        {
            this._isPlaying = false;
            return;
        }

        this._isPlaying = !!isPlaying;
        if (this._isPlaying && isNullOrUndefined(this._playingSongIndex))
        {
            const firstPlayableTrackUri = this.getTrackUris(true)[0];
            if (!firstPlayableTrackUri)
            {
                return;
            }

            const firstPlayableTrack = this._indexedTracklist[firstPlayableTrackUri];
            if (!firstPlayableTrack)
            {
                return;
            }

            this.playSongNamed(firstPlayableTrack.songName);
        }
    }

    setIsShuffleEnabled(isShuffleEnabled: boolean | null | undefined)
    {
        this._isShuffleEnabled = !!isShuffleEnabled;
        if (isNotNullAndUndefined(this._playingSongIndex) && isFinite(this._playingSongIndex))
        {
            this.clearPlayQueueStartingFrom(this._playingSongIndex);
            if (this._isShuffleEnabled)
            {
                const playingSongUri = this.getSongUriBySongIndex(this._playingSongIndex);
                this._playQueue.push(...this.getUpcomingSongUris(playingSongUri));
            }
        }
    }

    setSongExclusionStatus(songName: string, isExcluded: boolean | null | undefined)
    {
        const songUri = this.getSongUriByName(songName);
        if (!songUri)
        {
            return;
        }

        if (this._indexedTracklist[songUri].isExcludedFromActivePlaylist === !!isExcluded)
        {
            return;
        }

        const copyOfSong = {...this._indexedTracklist[songUri]};
        copyOfSong.isExcludedFromActivePlaylist = !!isExcluded;

        this._indexedTracklist[songUri] = copyOfSong;
        if (isNotNullAndUndefined(this._playingSongIndex) && isFinite(this._playingSongIndex))
        {
            const playingSongUri = this.getSongUriBySongIndex(this._playingSongIndex);
            this.clearPlayQueueStartingFrom(this._playingSongIndex);
            this._playQueue.push(...this.getUpcomingSongUris(playingSongUri));
        }
    }

    private getTrackUris(isPlayableOnly = false)
    {
        return Object.keys(this._indexedTracklist).filter(x => !isPlayableOnly || !this._indexedTracklist[x].isExcludedFromActivePlaylist);
    }

    private getTrackIndex(songUri?: string | undefined)
    {
        if (isNullOrUndefined(songUri))
        {
            return undefined;
        }

        const trackIndex = Object.keys(this._indexedTracklist).indexOf(songUri);
        if (trackIndex <= -1)
        {
            return undefined;
        }

        return trackIndex;
    }

    private getSongUriBySongIndex(songIndex: number | undefined)
    {
        return isNotNullAndUndefined(songIndex) ? this._playQueue[songIndex] : undefined;
    }

    private getSongUriByName(songName: string | undefined)
    {
        return Object.keys(this._indexedTracklist).find(x => this._indexedTracklist[x].songName === songName);
    }

    private clearPlayQueueStartingFrom(indexExcluded: number | undefined)
    {
        if (isNullOrUndefined(indexExcluded) || !isFinite(indexExcluded))
        {
            return;
        }

        this._playQueue.splice(indexExcluded + 1);
    }

    private getUpcomingSongUris(excludedSongUri: string | undefined)
    {
        let upcomingSongUris: string[] = [];
        if (this._isShuffleEnabled)
        {
            upcomingSongUris = this.getTrackUris(true).filter(x => x !== excludedSongUri);
            Ts.Array.shuffleInPlace(upcomingSongUris);
        }

        return upcomingSongUris;
    }

    private searchPlayQueueForTheFirstNonExcludedSongIndex(startIndexExcluded: number, isSearchingBackward = false)
    {
        let firstNonExcludedSongIndex = startIndexExcluded > this._playQueue.length ? this._playQueue.length : startIndexExcluded;
        while (true)
        {
            firstNonExcludedSongIndex = isSearchingBackward ? firstNonExcludedSongIndex - 1 : firstNonExcludedSongIndex + 1;
            if (firstNonExcludedSongIndex < 0)
            {
                return undefined;
            }

            const firstNonExcludedSongUri = this.getSongUriBySongIndex(firstNonExcludedSongIndex);
            const firstNonExcludedSong = isNotNullAndUndefined(firstNonExcludedSongUri)
                ? this._indexedTracklist[firstNonExcludedSongUri]
                : undefined;

            if (!firstNonExcludedSong?.isExcludedFromActivePlaylist)
            {
                break;
            }
        }

        return firstNonExcludedSongIndex;
    }

    private searchTracklistForTheFirstNonExcludedTrackIndex(startIndexExcluded: number, isSearchingBackward = false)
    {
        const trackUris = this.getTrackUris();
        let firstNonExcludedTrackIndex = startIndexExcluded > trackUris.length ? trackUris.length : startIndexExcluded;
        while (true)
        {
            firstNonExcludedTrackIndex = isSearchingBackward ? firstNonExcludedTrackIndex - 1 : firstNonExcludedTrackIndex + 1;
            if (firstNonExcludedTrackIndex < 0 || trackUris.length <= firstNonExcludedTrackIndex)
            {
                return undefined;
            }

            const firstNonExcludedTrackUri = trackUris[firstNonExcludedTrackIndex];
            const firstNonExcludedTrack = this._indexedTracklist[firstNonExcludedTrackUri];
            if (!firstNonExcludedTrack?.isExcludedFromActivePlaylist)
            {
                break;
            }
        }

        return firstNonExcludedTrackIndex;
    }
};