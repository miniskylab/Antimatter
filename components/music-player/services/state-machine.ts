import {isNotNullAndUndefined, isNullOrUndefined, Ts} from "@miniskylab/antimatter-framework";
import {SongRow} from "../components";
import {RepeatMode} from "../enums";

export const StateMachine = new class
{
    private _indexedTracklist: Record<string, SongRow.SongData>;
    private _playQueue: string[];
    private _playingSongIndex: number | undefined;
    private _isPlaying: boolean;
    private _secBackSkipRestartThreshold: number | null | undefined;
    private _secPlaybackProgress: number | null | undefined;
    private _secSeekerPosition: number | null | undefined;
    private _isSeekingInProgress: boolean;
    private _isShuffleEnabled: boolean;
    private _repeatMode: RepeatMode;

    constructor() { this.resetState(); }

    resetState(newState?: {
        indexedTracklist?: Record<string, SongRow.SongData>,
        playQueue?: string[],
        playingSongIndex?: number | undefined,
        isPlaying?: boolean,
        secBackSkipRestartThreshold?: number | null | undefined,
        secPlaybackProgress?: number | null | undefined,
        secSeekerPosition?: number | null | undefined,
        isSeekingInProgress?: boolean,
        isShuffleEnabled?: boolean,
        repeatMode?: RepeatMode
    })
    {
        this._indexedTracklist = newState?.indexedTracklist ? {...newState.indexedTracklist} : {};
        this._playQueue = newState?.playQueue ? [...newState.playQueue] : [];
        this._playingSongIndex = newState?.playingSongIndex;
        this._isPlaying = newState?.isPlaying ?? false;
        this._secBackSkipRestartThreshold = newState?.secBackSkipRestartThreshold;
        this._secPlaybackProgress = newState?.secPlaybackProgress;
        this._secSeekerPosition = newState?.secSeekerPosition;
        this._isSeekingInProgress = newState?.isSeekingInProgress ?? false;
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
            secBackSkipRestartThreshold: this._secBackSkipRestartThreshold,
            secPlaybackProgress: this._secPlaybackProgress,
            secSeekerPosition: this._secSeekerPosition,
            isSeekingInProgress: this._isSeekingInProgress,
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
            this._secSeekerPosition = undefined;
            return;
        }

        const lastPlayedSongIndex = this._playingSongIndex === Infinity
            ? this._playQueue.length - 1
            : this._playingSongIndex;

        const lastPlayedSongUri = this.getSongUriBySongIndex(lastPlayedSongIndex);
        if (toBePlayedSongUri === lastPlayedSongUri)
        {
            this._playingSongIndex = lastPlayedSongIndex;
            this._secSeekerPosition = undefined;
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
        this._secSeekerPosition = undefined;
        this._isPlaying = true;
    }

    playNext()
    {
        if (isNullOrUndefined(this._playingSongIndex) || this._playingSongIndex === Infinity)
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = undefined;
            this._isPlaying = false;
            return;
        }

        const toBePlayedSongIndex = this.searchPlayQueueForTheFirstNonExcludedNonDuplicateSongIndex(this._playingSongIndex);
        if (isNotNullAndUndefined(toBePlayedSongIndex) && toBePlayedSongIndex < this._playQueue.length)
        {
            this._playingSongIndex = toBePlayedSongIndex;
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = undefined;
            this._isPlaying = true;

            return;
        }

        const playingSongUri = this.getSongUriBySongIndex(this._playingSongIndex);
        const playableTrackUris = this.getTrackUris(true).filter(x => x !== playingSongUri);
        if (playableTrackUris.length > 0)
        {
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
                        this._secSeekerPosition = undefined;
                        this._playingSongIndex += 1;
                        this._isPlaying = true;

                        return;
                    }
                    else if (this._repeatMode === RepeatMode.All)
                    {
                        this._playQueue.push(playableTrackUris[0]);
                        this._secPlaybackProgress = undefined;
                        this._secSeekerPosition = undefined;
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
                    this._secSeekerPosition = undefined;
                    this._playingSongIndex += 1;
                    this._isPlaying = true;

                    return;
                }
            }
        }

        this._secPlaybackProgress = undefined;
        this._secSeekerPosition = undefined;
        this._playingSongIndex = Infinity;
        this._isPlaying = false;
    }

    playPrevious()
    {
        if (isNullOrUndefined(this._playingSongIndex))
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = undefined;
            this._isPlaying = false;

            return;
        }

        if (
            isNotNullAndUndefined(this._secBackSkipRestartThreshold) && isFinite(this._secBackSkipRestartThreshold) &&
            isNotNullAndUndefined(this._secPlaybackProgress) && isFinite(this._secPlaybackProgress) &&
            this._secPlaybackProgress > this._secBackSkipRestartThreshold
        )
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = 0;

            return;
        }

        if (this._isShuffleEnabled)
        {
            const firstNonExcludedNonDuplicateSongIndex = this.searchPlayQueueForTheFirstNonExcludedNonDuplicateSongIndex(
                this._playingSongIndex,
                true
            );

            if (isNotNullAndUndefined(firstNonExcludedNonDuplicateSongIndex))
            {
                this._playingSongIndex = firstNonExcludedNonDuplicateSongIndex;
                this._secPlaybackProgress = undefined;
                this._secSeekerPosition = undefined;
                this._isPlaying = true;

                return;
            }
        }
        else
        {
            const playingSongUri = this.getSongUriBySongIndex(this._playingSongIndex);
            const playingTrackIndex = this._playingSongIndex !== Infinity ? this.getTrackIndex(playingSongUri) : Infinity;
            if (isNotNullAndUndefined(playingTrackIndex))
            {
                const firstNonExcludedTrackIndex = this.searchTracklistForTheFirstNonExcludedTrackIndex(playingTrackIndex, true);
                const toBePlayedTrackUri = isNotNullAndUndefined(firstNonExcludedTrackIndex)
                    ? this.getTrackUris()[firstNonExcludedTrackIndex]
                    : this._repeatMode === RepeatMode.All
                        ? this.getTrackUris(true).filter(x => x !== playingSongUri).at(-1)
                        : undefined;

                if (isNotNullAndUndefined(toBePlayedTrackUri))
                {
                    this._playQueue.push(toBePlayedTrackUri);
                    this._playingSongIndex = this._playQueue.length - 1;
                    this._secPlaybackProgress = undefined;
                    this._secSeekerPosition = undefined;
                    this._isPlaying = true;

                    return;
                }
            }
        }

        this._secPlaybackProgress = undefined;
        this._secSeekerPosition = 0;
        this._isPlaying = false;
    }

    setIndexedTracklist(indexedTracklist: Record<string, SongRow.SongData>)
    {
        this._indexedTracklist = indexedTracklist ?? {};
        this._playQueue = [];
        this._playingSongIndex = undefined;
        this._isPlaying = false;
        this._secSeekerPosition = undefined;
        this._secPlaybackProgress = undefined;
    }

    setRepeatMode(newRepeatMode: RepeatMode)
    {
        this._repeatMode = newRepeatMode ?? RepeatMode.None;
    }

    setBackSkipRestartThreshold(secBackSkipRestartThreshold: number | null | undefined)
    {
        if (isNullOrUndefined(secBackSkipRestartThreshold) || !isFinite(secBackSkipRestartThreshold))
        {
            this._secBackSkipRestartThreshold = undefined;
            return;
        }

        if (secBackSkipRestartThreshold <= 5)
        {
            this._secBackSkipRestartThreshold = 5;
            return;
        }

        this._secBackSkipRestartThreshold = secBackSkipRestartThreshold;
    }

    setPlaybackProgress(secPlaybackProgress: number | null | undefined)
    {
        if (isNullOrUndefined(this._playingSongIndex) || !isFinite(this._playingSongIndex))
        {
            this._secPlaybackProgress = undefined;
            return;
        }

        if (isNullOrUndefined(secPlaybackProgress) || isNaN(secPlaybackProgress) || secPlaybackProgress < 0)
        {
            this._secPlaybackProgress = 0;
            return;
        }

        const playingSongDuration = this._indexedTracklist[this._playQueue[this._playingSongIndex]].secSongDuration;
        if (secPlaybackProgress > playingSongDuration)
        {
            this._secPlaybackProgress = playingSongDuration;
            return;
        }

        this._secPlaybackProgress = secPlaybackProgress;
    }

    setIsPlaying(isPlaying: boolean | null | undefined)
    {
        if (isNullOrUndefined(this._indexedTracklist) || this.getTrackUris(true).length === 0)
        {
            this._isPlaying = false;
            return;
        }

        this._isPlaying = !!isPlaying;
        if (this._isPlaying)
        {
            if (isNotNullAndUndefined(this._secSeekerPosition) && isFinite(this._secSeekerPosition))
            {
                this._secPlaybackProgress = this._secSeekerPosition;
                this._secSeekerPosition = undefined;
            }

            if (isNullOrUndefined(this._playingSongIndex) || this._playingSongIndex === Infinity)
            {
                const playableTrackUris = this.getTrackUris(true);
                const toBePlayedTrackIndex = this._isShuffleEnabled ? Math.round(Ts.Number.random(0, playableTrackUris.length - 1)) : 0;
                const toBePlayedTrackUri = playableTrackUris[toBePlayedTrackIndex];
                if (!toBePlayedTrackUri)
                {
                    return;
                }

                const toBePlayedTrack = this._indexedTracklist[toBePlayedTrackUri];
                if (!toBePlayedTrack)
                {
                    return;
                }

                this.playSongNamed(toBePlayedTrack.songName);
            }
        }
    }

    setSeekerPosition(secSeekerPosition: number | null | undefined)
    {
        if (isNullOrUndefined(this._playingSongIndex) || !isFinite(this._playingSongIndex))
        {
            this._secSeekerPosition = undefined;
            return;
        }

        if (isNullOrUndefined(secSeekerPosition) || isNaN(secSeekerPosition) || secSeekerPosition < 0)
        {
            this._secSeekerPosition = undefined;
            return;
        }

        const playingSongDuration = this._indexedTracklist[this._playQueue[this._playingSongIndex]].secSongDuration;
        if (secSeekerPosition > playingSongDuration)
        {
            this._secSeekerPosition = playingSongDuration;
            return;
        }

        this._secSeekerPosition = secSeekerPosition;
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

    private searchPlayQueueForTheFirstNonExcludedNonDuplicateSongIndex(playingSongIndexExcluded: number, isSearchingBackward = false)
    {
        let firstNonExcludedNonDuplicateSongIndex = playingSongIndexExcluded > this._playQueue.length
            ? this._playQueue.length
            : playingSongIndexExcluded;

        while (true)
        {
            firstNonExcludedNonDuplicateSongIndex = isSearchingBackward
                ? firstNonExcludedNonDuplicateSongIndex - 1
                : firstNonExcludedNonDuplicateSongIndex + 1;

            if (firstNonExcludedNonDuplicateSongIndex < 0)
            {
                return undefined;
            }

            const firstNonExcludedNonDuplicateSongUri = this.getSongUriBySongIndex(firstNonExcludedNonDuplicateSongIndex);
            const firstNonExcludedNonDuplicateSong = isNotNullAndUndefined(firstNonExcludedNonDuplicateSongUri)
                ? this._indexedTracklist[firstNonExcludedNonDuplicateSongUri]
                : undefined;

            const playingSongUri = this.getSongUriBySongIndex(playingSongIndexExcluded);
            if (!firstNonExcludedNonDuplicateSong?.isExcludedFromActivePlaylist && firstNonExcludedNonDuplicateSongUri !== playingSongUri)
            {
                break;
            }
        }

        return firstNonExcludedNonDuplicateSongIndex;
    }

    private searchTracklistForTheFirstNonExcludedTrackIndex(playingTrackIndexExcluded: number, isSearchingBackward = false)
    {
        const trackUris = this.getTrackUris();
        let firstNonExcludedTrackIndex = playingTrackIndexExcluded > trackUris.length ? trackUris.length : playingTrackIndexExcluded;
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
