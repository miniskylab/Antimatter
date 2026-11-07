import {isNotNullAndUndefined, isNullOrUndefined, Ts} from "@miniskylab/antimatter-framework";
import {AudioRow} from "../components";
import {RepeatMode} from "../enums";

export const StateMachine = new class
{
    private _indexedTracklist: Record<string, AudioRow.AudioData>;
    private _playQueue: string[];
    private _playingAudioIndex: number | undefined;
    private _isPlaying: boolean;
    private _secBackSkipRestartThreshold: number | null | undefined;
    private _secPlaybackProgress: number | null | undefined;
    private _secSeekerPosition: number | null | undefined;
    private _isSeekingInProgress: boolean;
    private _isShuffleEnabled: boolean;
    private _repeatMode: RepeatMode;

    constructor() { this.resetState(); }

    resetState(newState?: {
        indexedTracklist?: Record<string, AudioRow.AudioData>,
        playQueue?: string[],
        playingAudioIndex?: number | undefined,
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
        this._playingAudioIndex = newState?.playingAudioIndex;
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
            playingAudioIndex: this._playingAudioIndex,
            isPlaying: this._isPlaying,
            secBackSkipRestartThreshold: this._secBackSkipRestartThreshold,
            secPlaybackProgress: this._secPlaybackProgress,
            secSeekerPosition: this._secSeekerPosition,
            isSeekingInProgress: this._isSeekingInProgress,
            isShuffleEnabled: this._isShuffleEnabled,
            repeatMode: this._repeatMode
        };
    }

    playAudioNamed(toBePlayedAudioName: string)
    {
        const toBePlayedAudioUri = this.getAudioUriByName(toBePlayedAudioName);
        if (!toBePlayedAudioUri)
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = undefined;
            return;
        }

        const lastPlayedAudioIndex = this._playingAudioIndex === Infinity
            ? this._playQueue.length - 1
            : this._playingAudioIndex;

        const lastPlayedAudioUri = this.getAudioUriByAudioIndex(lastPlayedAudioIndex);
        if (toBePlayedAudioUri === lastPlayedAudioUri)
        {
            this._playingAudioIndex = lastPlayedAudioIndex;
            this._secSeekerPosition = undefined;
            this._isPlaying = true;

            return;
        }

        this.clearPlayQueueStartingFrom(lastPlayedAudioIndex);
        this._playQueue.push(toBePlayedAudioUri);
        this._playingAudioIndex = this._playQueue.length - 1;

        if (this._isShuffleEnabled)
        {
            this._playQueue.push(...this.getUpcomingAudioUris(toBePlayedAudioUri));
        }

        this._secPlaybackProgress = undefined;
        this._secSeekerPosition = undefined;
        this._isPlaying = true;
    }

    playNext()
    {
        if (isNullOrUndefined(this._playingAudioIndex) || this._playingAudioIndex === Infinity)
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = undefined;
            this._isPlaying = false;
            return;
        }

        const toBePlayedAudioIndex = this.searchPlayQueueForTheFirstNonExcludedNonDuplicateAudioIndex(this._playingAudioIndex);
        if (isNotNullAndUndefined(toBePlayedAudioIndex) && toBePlayedAudioIndex < this._playQueue.length)
        {
            this._repeatMode = this._repeatMode === RepeatMode.One ? RepeatMode.All : this._repeatMode;
            this._playingAudioIndex = toBePlayedAudioIndex;
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = undefined;
            this._isPlaying = true;

            return;
        }

        const playableTrackUris = this.getTrackUris(true);
        if (this._repeatMode === RepeatMode.All && playableTrackUris.length === 1)
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = 0;
            this._isPlaying = true;
            return;
        }

        const playingAudioUri = this.getAudioUriByAudioIndex(this._playingAudioIndex);
        const notPlayingPlayableTrackUris = playableTrackUris.filter(x => x !== playingAudioUri);
        if (notPlayingPlayableTrackUris.length > 0)
        {
            if (!this._isShuffleEnabled)
            {
                const playingTrackIndex = this.getTrackIndex(playingAudioUri);
                if (isNotNullAndUndefined(playingTrackIndex))
                {
                    const trackUris = this.getTrackUris();
                    const toBePlayedTrackIndex = this.searchTracklistForTheFirstNonExcludedTrackIndex(playingTrackIndex);
                    if (isNotNullAndUndefined(toBePlayedTrackIndex))
                    {
                        this._repeatMode = this._repeatMode === RepeatMode.One ? RepeatMode.All : this._repeatMode;
                        this._playQueue.push(trackUris[toBePlayedTrackIndex]);
                        this._secPlaybackProgress = undefined;
                        this._secSeekerPosition = undefined;
                        this._playingAudioIndex += 1;
                        this._isPlaying = true;

                        return;
                    }
                    else if (this._repeatMode === RepeatMode.All)
                    {
                        this._playQueue.push(notPlayingPlayableTrackUris[0]);
                        this._secPlaybackProgress = undefined;
                        this._secSeekerPosition = undefined;
                        this._playingAudioIndex += 1;
                        this._isPlaying = true;

                        return;
                    }
                }
            }
            else if (this._repeatMode === RepeatMode.All)
            {
                const upcomingAudioUris = this.getUpcomingAudioUris(playingAudioUri);
                if (upcomingAudioUris.length > 0)
                {
                    this._playQueue.push(...upcomingAudioUris);
                    this._secPlaybackProgress = undefined;
                    this._secSeekerPosition = undefined;
                    this._playingAudioIndex += 1;
                    this._isPlaying = true;

                    return;
                }
            }
        }

        this._secPlaybackProgress = undefined;
        this._secSeekerPosition = undefined;
        this._playingAudioIndex = Infinity;
        this._isPlaying = false;
    }

    playPrevious()
    {
        if (isNullOrUndefined(this._playingAudioIndex))
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = undefined;
            this._isPlaying = false;

            return;
        }

        if (
            isNotNullAndUndefined(this._secBackSkipRestartThreshold) && Number.isFinite(this._secBackSkipRestartThreshold) &&
            isNotNullAndUndefined(this._secPlaybackProgress) && Number.isFinite(this._secPlaybackProgress) &&
            this._secPlaybackProgress > this._secBackSkipRestartThreshold
        )
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = 0;

            return;
        }

        if (this._isShuffleEnabled)
        {
            const firstNonExcludedNonDuplicateAudioIndex = this.searchPlayQueueForTheFirstNonExcludedNonDuplicateAudioIndex(
                this._playingAudioIndex,
                true
            );

            if (isNotNullAndUndefined(firstNonExcludedNonDuplicateAudioIndex))
            {
                this._repeatMode = this._repeatMode === RepeatMode.One ? RepeatMode.All : this._repeatMode;
                this._playingAudioIndex = firstNonExcludedNonDuplicateAudioIndex;
                this._secPlaybackProgress = undefined;
                this._secSeekerPosition = undefined;
                this._isPlaying = true;

                return;
            }
        }
        else
        {
            const playingAudioUri = this.getAudioUriByAudioIndex(this._playingAudioIndex);
            const playingTrackIndex = this._playingAudioIndex !== Infinity ? this.getTrackIndex(playingAudioUri) : Infinity;
            if (isNotNullAndUndefined(playingTrackIndex))
            {
                const firstNonExcludedTrackIndex = this.searchTracklistForTheFirstNonExcludedTrackIndex(playingTrackIndex, true);
                const toBePlayedTrackUri = isNotNullAndUndefined(firstNonExcludedTrackIndex)
                    ? this.getTrackUris()[firstNonExcludedTrackIndex]
                    : this._repeatMode === RepeatMode.All
                        ? this.getTrackUris(true).filter(x => x !== playingAudioUri).at(-1)
                        : undefined;

                if (isNotNullAndUndefined(toBePlayedTrackUri))
                {
                    this._playQueue.push(toBePlayedTrackUri);
                    this._playingAudioIndex = this._playQueue.length - 1;
                    this._repeatMode = this._repeatMode === RepeatMode.One ? RepeatMode.All : this._repeatMode;
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

    onAudioEnd()
    {
        if (this._repeatMode === RepeatMode.One)
        {
            this._secPlaybackProgress = undefined;
            this._secSeekerPosition = 0;
            return;
        }

        this.playNext();
    }

    setIndexedTracklist(indexedTracklist: Record<string, AudioRow.AudioData>)
    {
        this._indexedTracklist = indexedTracklist ?? {};
        this._playQueue = [];
        this._playingAudioIndex = undefined;
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
        if (isNullOrUndefined(secBackSkipRestartThreshold) || !Number.isFinite(secBackSkipRestartThreshold))
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
        if (isNullOrUndefined(this._playingAudioIndex) || !Number.isFinite(this._playingAudioIndex))
        {
            this._secPlaybackProgress = undefined;
            return;
        }

        if (isNullOrUndefined(secPlaybackProgress) || Number.isNaN(secPlaybackProgress) || secPlaybackProgress < 0)
        {
            this._secPlaybackProgress = 0;
            return;
        }

        const playingAudioDuration = this._indexedTracklist[this._playQueue[this._playingAudioIndex]].secAudioDuration;
        if (secPlaybackProgress > playingAudioDuration)
        {
            this._secPlaybackProgress = playingAudioDuration;
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
            if (Number.isFinite(this._secSeekerPosition))
            {
                this._secPlaybackProgress = this._secSeekerPosition;
                this._secSeekerPosition = undefined;
            }

            if (isNullOrUndefined(this._playingAudioIndex) || this._playingAudioIndex === Infinity)
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

                this.playAudioNamed(toBePlayedTrack.audioName);
            }
        }
    }

    setSeekerPosition(secSeekerPosition: number | null | undefined)
    {
        if (isNullOrUndefined(this._playingAudioIndex) || !Number.isFinite(this._playingAudioIndex))
        {
            this._secSeekerPosition = undefined;
            return;
        }

        if (isNullOrUndefined(secSeekerPosition) || Number.isNaN(secSeekerPosition) || secSeekerPosition < 0)
        {
            this._secSeekerPosition = undefined;
            return;
        }

        const playingAudioDuration = this._indexedTracklist[this._playQueue[this._playingAudioIndex]].secAudioDuration;
        if (secSeekerPosition > playingAudioDuration)
        {
            this._secSeekerPosition = playingAudioDuration;
            return;
        }

        this._secSeekerPosition = secSeekerPosition;
    }

    setIsShuffleEnabled(isShuffleEnabled: boolean | null | undefined)
    {
        this._isShuffleEnabled = !!isShuffleEnabled;
        if (Number.isFinite(this._playingAudioIndex))
        {
            this.clearPlayQueueStartingFrom(this._playingAudioIndex);
            if (this._isShuffleEnabled)
            {
                const playingAudioUri = this.getAudioUriByAudioIndex(this._playingAudioIndex);
                this._playQueue.push(...this.getUpcomingAudioUris(playingAudioUri));
            }
        }
    }

    setAudioExclusionStatus(audioName: string, isExcluded: boolean | null | undefined)
    {
        const audioUri = this.getAudioUriByName(audioName);
        if (!audioUri)
        {
            return;
        }

        if (this._indexedTracklist[audioUri].isExcludedFromActivePlaylist === !!isExcluded)
        {
            return;
        }

        const copyOfAudio = {...this._indexedTracklist[audioUri]};
        copyOfAudio.isExcludedFromActivePlaylist = !!isExcluded;

        this._indexedTracklist[audioUri] = copyOfAudio;
        if (Number.isFinite(this._playingAudioIndex))
        {
            const playingAudioUri = this.getAudioUriByAudioIndex(this._playingAudioIndex);
            if (this._repeatMode === RepeatMode.One && playingAudioUri === audioUri)
            {
                this._repeatMode = RepeatMode.All;
            }

            this.clearPlayQueueStartingFrom(this._playingAudioIndex);
            this._playQueue.push(...this.getUpcomingAudioUris(playingAudioUri));
        }
    }

    private getTrackUris(isPlayableOnly = false)
    {
        return Object.keys(this._indexedTracklist).filter(x => !isPlayableOnly || !this._indexedTracklist[x].isExcludedFromActivePlaylist);
    }

    private getTrackIndex(audioUri?: string | undefined)
    {
        if (isNullOrUndefined(audioUri))
        {
            return undefined;
        }

        const trackIndex = Object.keys(this._indexedTracklist).indexOf(audioUri);
        if (trackIndex <= -1)
        {
            return undefined;
        }

        return trackIndex;
    }

    private getAudioUriByAudioIndex(audioIndex: number | undefined)
    {
        return isNotNullAndUndefined(audioIndex) ? this._playQueue[audioIndex] : undefined;
    }

    private getAudioUriByName(audioName: string | undefined)
    {
        return Object.keys(this._indexedTracklist).find(x => this._indexedTracklist[x].audioName === audioName);
    }

    private clearPlayQueueStartingFrom(indexExcluded: number | undefined)
    {
        if (isNullOrUndefined(indexExcluded) || !Number.isFinite(indexExcluded))
        {
            return;
        }

        this._playQueue.splice(indexExcluded + 1);
    }

    private getUpcomingAudioUris(excludedAudioUri: string | undefined)
    {
        let upcomingAudioUris: string[] = [];
        if (this._isShuffleEnabled)
        {
            upcomingAudioUris = this.getTrackUris(true).filter(x => x !== excludedAudioUri);
            Ts.Array.shuffleInPlace(upcomingAudioUris);
        }

        return upcomingAudioUris;
    }

    private searchPlayQueueForTheFirstNonExcludedNonDuplicateAudioIndex(playingAudioIndexExcluded: number, isSearchingBackward = false)
    {
        let firstNonExcludedNonDuplicateAudioIndex = playingAudioIndexExcluded > this._playQueue.length
            ? this._playQueue.length
            : playingAudioIndexExcluded;

        while (true)
        {
            firstNonExcludedNonDuplicateAudioIndex = isSearchingBackward
                ? firstNonExcludedNonDuplicateAudioIndex - 1
                : firstNonExcludedNonDuplicateAudioIndex + 1;

            if (firstNonExcludedNonDuplicateAudioIndex < 0)
            {
                return undefined;
            }

            const firstNonExcludedNonDuplicateAudioUri = this.getAudioUriByAudioIndex(firstNonExcludedNonDuplicateAudioIndex);
            const firstNonExcludedNonDuplicateAudio = isNotNullAndUndefined(firstNonExcludedNonDuplicateAudioUri)
                ? this._indexedTracklist[firstNonExcludedNonDuplicateAudioUri]
                : undefined;

            const playingAudioUri = this.getAudioUriByAudioIndex(playingAudioIndexExcluded);
            if (
                !firstNonExcludedNonDuplicateAudio?.isExcludedFromActivePlaylist &&
                firstNonExcludedNonDuplicateAudioUri !== playingAudioUri
            )
            {
                break;
            }
        }

        return firstNonExcludedNonDuplicateAudioIndex;
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
