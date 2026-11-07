import {RepeatMode} from "../enums";
import {StateMachine} from "./state-machine";

function normalize(stringArray: string[]): string[]
{
    return stringArray.filter((value, index, array) => array.indexOf(value) === index).sort();
}

test("resetting state works correctly", () =>
{
    // Act & Assert
    StateMachine.resetState();
    expect(StateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(StateMachine.getState().playQueue).toStrictEqual([]);
    expect(StateMachine.getState().playingAudioIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().secBackSkipRestartThreshold).toBeUndefined();
    expect(StateMachine.getState().isSeekingInProgress).toBe(false);
    expect(StateMachine.getState().isShuffleEnabled).toBe(false);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.None);

    // Act & Assert
    const playQueue = ["test-audio"];
    const indexedTracklist = {"test-audio": {audioName: "Test Audio", secAudioDuration: 98}};
    StateMachine.resetState({indexedTracklist, playQueue, isShuffleEnabled: true, repeatMode: RepeatMode.All});
    expect(StateMachine.getState().indexedTracklist).toStrictEqual(indexedTracklist);
    expect(StateMachine.getState().indexedTracklist).not.toBe(indexedTracklist);
    expect(StateMachine.getState().playQueue).toStrictEqual(playQueue);
    expect(StateMachine.getState().playQueue).not.toBe(playQueue);
    expect(StateMachine.getState().playingAudioIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().secBackSkipRestartThreshold).toBeUndefined();
    expect(StateMachine.getState().isSeekingInProgress).toBe(false);
    expect(StateMachine.getState().isShuffleEnabled).toBe(true);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);
});

test("indexing tracklist works correctly", () =>
{
    // Test Data
    const indexedTracklist = {
        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
        "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
        "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
    };

    // Arrange
    StateMachine.resetState({indexedTracklist: {"test-audio": {audioName: "Test Audio", secAudioDuration: 98}}});
    StateMachine.setRepeatMode(RepeatMode.All);
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.setBackSkipRestartThreshold(10);
    StateMachine.playAudioNamed("Test Audio");
    StateMachine.setPlaybackProgress(30);
    StateMachine.setSeekerPosition(40);
    expect(StateMachine.getState().playQueue).toStrictEqual(["test-audio"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.setIndexedTracklist(indexedTracklist);
    expect(StateMachine.getState().indexedTracklist).toStrictEqual(indexedTracklist);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);
    expect(StateMachine.getState().isSeekingInProgress).toBe(false);
    expect(StateMachine.getState().isShuffleEnabled).toBe(true);
    expect(StateMachine.getState().secBackSkipRestartThreshold).toBe(10);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual([]);
    expect(StateMachine.getState().playingAudioIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);
});

test("turning shuffle on and off works correctly", () =>
{
    // Arrange
    StateMachine.resetState();

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().isShuffleEnabled).toBe(true);

    [undefined, null, false].forEach(isShuffleEnabled =>
    {
        // Arrange
        StateMachine.resetState();

        // Act & Assert
        StateMachine.setIsShuffleEnabled(isShuffleEnabled);
        expect(StateMachine.getState().isShuffleEnabled).toBe(false);
    });
});

test("turning shuffle on queues up new audio items if there is audio selected for playback", () =>
{
    // Test Data
    const indexedTracklist = {
        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
        "audio-3": {audioName: "Audio 3", secAudioDuration: 149}
    };

    // Arrange: Playback is playing
    StateMachine.resetState({indexedTracklist});
    StateMachine.playAudioNamed("Audio 1");
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-2", "audio-3"]);


    // Arrange: Playback is paused
    StateMachine.resetState({indexedTracklist});
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.setIsPlaying(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-2", "audio-3"]);
});

test("turning shuffle off clears upcoming audio items if there is audio selected for playback", () =>
{
    // Test Data
    const indexedTracklist = {
        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
        "audio-3": {audioName: "Audio 3", secAudioDuration: 149}
    };

    // Arrange: Playback is playing
    StateMachine.resetState({indexedTracklist});
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playAudioNamed("Audio 1");
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-2", "audio-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);


    // Arrange: Playback is paused
    StateMachine.resetState({indexedTracklist});
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.setIsPlaying(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-2", "audio-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
});

test("turning shuffle on and off doesn't alter play queue if there is no audio selected for playback", () =>
{
    // Test Data
    const indexedTracklist = {
        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
        "audio-3": {audioName: "Audio 3", secAudioDuration: 149}
    };

    // Arrange: Both tracklist and play queue are empty
    StateMachine.resetState();

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().playQueue).toStrictEqual([]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playQueue).toStrictEqual([]);


    // Arrange: Only play queue is empty
    StateMachine.resetState({indexedTracklist});

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().playQueue).toStrictEqual([]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playQueue).toStrictEqual([]);


    // Arrange: All audio has finished playing
    StateMachine.resetState({indexedTracklist});
    StateMachine.playAudioNamed("Audio 3");
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);


    // Arrange
    StateMachine.setRepeatMode(RepeatMode.All);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
});

test("setting repeat mode works correctly", () =>
{
    StateMachine.resetState();
    StateMachine.setRepeatMode(RepeatMode.All);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);

    StateMachine.resetState();
    StateMachine.setRepeatMode(RepeatMode.One);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.One);

    [undefined, null, RepeatMode.None].forEach((repeatMode: RepeatMode) =>
    {
        StateMachine.resetState();
        StateMachine.setRepeatMode(repeatMode);
        expect(StateMachine.getState().repeatMode).toBe(RepeatMode.None);
    });
});

test("setting back skip restart threshold works correctly", () =>
{
    // Arrange
    StateMachine.resetState();

    // Act & Assert
    StateMachine.setBackSkipRestartThreshold(10);
    expect(StateMachine.getState().secBackSkipRestartThreshold).toBe(10);

    [undefined, null, NaN, Infinity, -Infinity].forEach(secBackSkipRestartThreshold =>
    {
        // Arrange
        StateMachine.resetState();

        // Act & Assert
        StateMachine.setBackSkipRestartThreshold(secBackSkipRestartThreshold);
        expect(StateMachine.getState().secBackSkipRestartThreshold).toBeUndefined();
    });

    [-1, 0, 1, 2, 5].forEach(secBackSkipRestartThreshold =>
    {
        // Arrange
        StateMachine.resetState();

        // Act & Assert
        StateMachine.setBackSkipRestartThreshold(secBackSkipRestartThreshold);
        expect(StateMachine.getState().secBackSkipRestartThreshold).toBe(5);
    });
});

test("pausing and resuming playback works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);

    // Act & Assert
    StateMachine.setIsPlaying(false);
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
});

test("resuming playback plays first audio in playlist when shuffle is off and there is no audio selected for playback", () =>
{
    // Test Data
    const indexedTracklist = {
        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
        "audio-3": {audioName: "Audio 3", secAudioDuration: 149}
    };

    [RepeatMode.None, RepeatMode.All].forEach(repeatMode =>
    {
        // Arrange
        StateMachine.resetState({indexedTracklist});
        StateMachine.setRepeatMode(repeatMode);

        // Act & Assert
        StateMachine.setIsPlaying(true);
        expect(StateMachine.getState().isPlaying).toBe(true);
        expect(StateMachine.getState().playingAudioIndex).toBe(0);
        expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    });


    // Arrange
    StateMachine.resetState({indexedTracklist});
    StateMachine.playAudioNamed("Audio 3");
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3", "audio-1"]);
});

test("resuming playback plays random audio in playlist when shuffle is on and there is no audio selected for playback", () =>
{
    // Test Data
    const indexedTracklist = {
        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
        "audio-3": {audioName: "Audio 3", secAudioDuration: 149}
    };

    const tryCount = 50;
    let playedAudioUriFromPreviousTest: string | undefined = undefined;
    [RepeatMode.None, RepeatMode.All].forEach(repeatMode =>
    {
        for (let i = 1; i <= tryCount; i++)
        {
            // Arrange
            StateMachine.resetState({indexedTracklist});
            StateMachine.setIsShuffleEnabled(true);
            StateMachine.setRepeatMode(repeatMode);

            // Act & Assert
            StateMachine.setIsPlaying(true);
            expect(StateMachine.getState().isPlaying).toBe(true);
            expect(StateMachine.getState().playingAudioIndex).toBe(0);
            expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3"]);

            const state = StateMachine.getState();
            const playingAudioUri = state.playQueue[state.playingAudioIndex!];
            if (playedAudioUriFromPreviousTest !== undefined && playedAudioUriFromPreviousTest !== playingAudioUri)
            {
                break;
            }
            else if (i === tryCount)
            {
                throw new Error(`played audio is expected to be random but instead is '${playingAudioUri}' ${tryCount} times in a row!`);
            }

            playedAudioUriFromPreviousTest = playingAudioUri;
        }
    });

    playedAudioUriFromPreviousTest = undefined;
    for (let i = 1; i <= tryCount; i++)
    {
        // Arrange
        StateMachine.resetState({indexedTracklist});
        StateMachine.setIsShuffleEnabled(true);
        StateMachine.playAudioNamed("Audio 1");
        StateMachine.playNext();
        StateMachine.playNext();
        StateMachine.playNext();
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
        expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3"]);

        // Act
        StateMachine.setIsPlaying(true);

        // Assert
        expect(StateMachine.getState().isPlaying).toBe(true);
        if (StateMachine.getState().playingAudioIndex === 2)
        {
            expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3"]);
        }
        else
        {
            expect(StateMachine.getState().playingAudioIndex).toBe(3);
            expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual([
                "audio-1", "audio-1", "audio-2", "audio-2", "audio-3", "audio-3"
            ]);
        }

        const state = StateMachine.getState();
        const playingAudioUri = state.playQueue[state.playingAudioIndex!];
        if (playedAudioUriFromPreviousTest !== undefined && playedAudioUriFromPreviousTest !== playingAudioUri)
        {
            break;
        }
        else if (i === tryCount)
        {
            throw new Error(`played audio is expected to be random but instead is '${playingAudioUri}' ${tryCount} times in a row!`);
        }

        playedAudioUriFromPreviousTest = playingAudioUri;
    }
});

test("resuming playback does nothing if all audio is excluded and there is no audio selected for playback", () =>
{
    // Test Data
    const indexedTracklist = {
        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
        "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
        "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
    };

    [false, true].forEach(isShuffleEnabled =>
    {
        // Arrange
        StateMachine.resetState({indexedTracklist});
        StateMachine.setIsShuffleEnabled(isShuffleEnabled);
        StateMachine.setAudioExclusionStatus("Audio 1", true);
        StateMachine.setAudioExclusionStatus("Audio 2", true);
        StateMachine.setAudioExclusionStatus("Audio 3", true);
        StateMachine.setAudioExclusionStatus("Audio 4", true);

        // Act & Assert
        StateMachine.setIsPlaying(true);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().playingAudioIndex).toBeUndefined();
        expect(StateMachine.getState().playQueue).toStrictEqual([]);


        // Arrange
        StateMachine.resetState({indexedTracklist});
        StateMachine.setIsShuffleEnabled(isShuffleEnabled);
        StateMachine.playAudioNamed("Audio 1");
        StateMachine.playNext();
        StateMachine.playNext();
        StateMachine.playNext();
        StateMachine.playNext();
        StateMachine.setAudioExclusionStatus("Audio 1", true);
        StateMachine.setAudioExclusionStatus("Audio 2", true);
        StateMachine.setAudioExclusionStatus("Audio 3", true);
        StateMachine.setAudioExclusionStatus("Audio 4", true);
        expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);

        // Act & Assert
        StateMachine.setIsPlaying(true);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
        expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    });
});

test("resuming playback synchronizes playback progress with seeker position", () =>
{
    // Arrange
    StateMachine.resetState({indexedTracklist: {"audio-3": {audioName: "Audio 3", secAudioDuration: 149}}});
    StateMachine.playAudioNamed("Audio 3");
    StateMachine.setPlaybackProgress(30);
    StateMachine.setSeekerPosition(40);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().secPlaybackProgress).toBe(40);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
});

test("playing specific audio when shuffle is off works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.setPlaybackProgress(30);
    StateMachine.setSeekerPosition(45);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.playAudioNamed("Audio 4");
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act
    StateMachine.playAudioNamed("Audio 2");

    // Assert: State is correct
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4", "audio-2"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(4);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating forward sequentially to last audio in playlist works correctly
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4", "audio-2", "audio-3"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-2", "audio-3", "audio-4"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(6);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act
    StateMachine.playAudioNamed("Audio 3");

    // Assert: State is correct
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-2", "audio-3", "audio-4", "audio-3"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(7);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating backward sequentially to first audio in playlist works correctly
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-2", "audio-3", "audio-4", "audio-3", "audio-2"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(8);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-2", "audio-3", "audio-4", "audio-3", "audio-2", "audio-1"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(9);
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("playing specific audio when shuffle is on works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);

    // Act & Assert
    StateMachine.playAudioNamed("Audio 1");
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.playAudioNamed("Audio 3");
    expect(StateMachine.getState().playingAudioIndex).toBe(1);

    // Act
    StateMachine.playAudioNamed("Audio 4");

    // Assert: State is correct
    expect(StateMachine.getState().playQueue.slice(0, 2)).toStrictEqual(["audio-1", "audio-3"]);
    expect(StateMachine.getState().playQueue[2]).toBe("audio-4");
    expect(StateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["audio-1", "audio-2", "audio-3"]);
    expect(StateMachine.getState().playQueue.length).toBe(6);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating backward works correctly
    StateMachine.playPrevious();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Assert: Navigating forward works correctly
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(4);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().isPlaying).toBe(false);
});

test("playing specific audio preserves repeat mode", () =>
{
    [RepeatMode.None, RepeatMode.One, RepeatMode.All].forEach(repeatMode =>
    {
        [false, true].forEach(isShuffleEnabled =>
        {
            // Arrange
            StateMachine.resetState({
                indexedTracklist: {
                    "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                    "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                    "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                    "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
                }
            });
            StateMachine.setRepeatMode(repeatMode);
            StateMachine.setIsShuffleEnabled(isShuffleEnabled);

            // Act & Assert
            StateMachine.playAudioNamed("Audio 3");
            expect(StateMachine.getState().repeatMode).toBe(repeatMode);
        });
    });
});

test("setting seeker position works correctly", () =>
{
    // Test Data
    const indexedTracklist = {
        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
        "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
        "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
    };

    // Arrange: No playing audio
    StateMachine.resetState({indexedTracklist});

    // Act & Assert
    StateMachine.setSeekerPosition(24);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();


    // Arrange: Playing audio is not excluded
    StateMachine.resetState({indexedTracklist});
    StateMachine.playAudioNamed("Audio 1");

    [0, 15, 30, 45, 60].forEach(secSeekerPosition =>
    {
        // Arrange
        StateMachine.setIsPlaying(true);

        // Act & Assert
        StateMachine.setSeekerPosition(secSeekerPosition);
        expect(StateMachine.getState().isPlaying).toBe(true);
        expect(StateMachine.getState().secSeekerPosition).toBe(secSeekerPosition);


        // Arrange
        StateMachine.setIsPlaying(false);

        // Act & Assert
        StateMachine.setSeekerPosition(secSeekerPosition);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().secSeekerPosition).toBe(secSeekerPosition);
    });

    [undefined, null, NaN, -Infinity, -1].forEach(secSeekerPosition =>
    {
        // Arrange
        StateMachine.setIsPlaying(true);

        // Act & Assert
        StateMachine.setSeekerPosition(secSeekerPosition);
        expect(StateMachine.getState().isPlaying).toBe(true);
        expect(StateMachine.getState().secSeekerPosition).toBeUndefined();


        // Arrange
        StateMachine.setIsPlaying(false);

        // Act & Assert
        StateMachine.setSeekerPosition(secSeekerPosition);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    });

    [100, Infinity].forEach(secSeekerPosition =>
    {
        // Arrange
        StateMachine.setIsPlaying(true);

        // Act & Assert
        StateMachine.setSeekerPosition(secSeekerPosition);
        expect(StateMachine.getState().isPlaying).toBe(true);
        expect(StateMachine.getState().secSeekerPosition).toBe(74);


        // Arrange
        StateMachine.setIsPlaying(false);

        // Act & Assert
        StateMachine.setSeekerPosition(secSeekerPosition);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().secSeekerPosition).toBe(74);
    });


    [true, false].forEach(isPlaying =>
    {
        // Arrange: Playing audio is excluded
        StateMachine.resetState({indexedTracklist});
        StateMachine.playAudioNamed("Audio 2");
        StateMachine.setAudioExclusionStatus("Audio 2", true);
        StateMachine.setIsPlaying(isPlaying);

        // Act & Assert
        StateMachine.setSeekerPosition(30);
        expect(StateMachine.getState().secSeekerPosition).toBe(30);
        expect(StateMachine.getState().isPlaying).toBe(isPlaying);
    });
});

test("setting playback progress works correctly", () =>
{
    // Arrange
    StateMachine.resetState({indexedTracklist: {"audio-1": {audioName: "Audio 1", secAudioDuration: 74}}});

    // Act & Assert
    StateMachine.setPlaybackProgress(24);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    StateMachine.playAudioNamed("Audio 1");

    [0, 15, 30, 45, 60].forEach(secPlaybackProgress =>
    {
        // Arrange
        StateMachine.setIsPlaying(true);
        StateMachine.setPlaybackProgress(70);

        // Act & Assert
        StateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(StateMachine.getState().isPlaying).toBe(true);
        expect(StateMachine.getState().secPlaybackProgress).toBe(secPlaybackProgress);


        // Arrange
        StateMachine.setIsPlaying(false);
        StateMachine.setPlaybackProgress(70);

        // Act & Assert
        StateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().secPlaybackProgress).toBe(secPlaybackProgress);
    });

    [undefined, null, NaN, -Infinity, -1].forEach(secPlaybackProgress =>
    {
        // Arrange
        StateMachine.setIsPlaying(true);
        StateMachine.setPlaybackProgress(25);

        // Act & Assert
        StateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(StateMachine.getState().isPlaying).toBe(true);
        expect(StateMachine.getState().secPlaybackProgress).toBe(0);


        // Arrange
        StateMachine.setIsPlaying(false);
        StateMachine.setPlaybackProgress(25);

        // Act & Assert
        StateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().secPlaybackProgress).toBe(0);
    });

    [100, Infinity].forEach(secPlaybackProgress =>
    {
        // Arrange
        StateMachine.setIsPlaying(true);
        StateMachine.setPlaybackProgress(25);

        // Act & Assert
        StateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(StateMachine.getState().isPlaying).toBe(true);
        expect(StateMachine.getState().secPlaybackProgress).toBe(74);


        // Arrange
        StateMachine.setIsPlaying(false);
        StateMachine.setPlaybackProgress(25);

        // Act & Assert
        StateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().secPlaybackProgress).toBe(74);
    });


    // Arrange
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);

    // Act & Assert
    StateMachine.setPlaybackProgress(32);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
});

test("changing playing audio resets seeker position", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149}
        }
    });
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.setSeekerPosition(15);

    // Act & Assert
    StateMachine.playAudioNamed("Audio 2");
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();


    // Arrange
    StateMachine.setSeekerPosition(30);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();


    // Arrange
    StateMachine.setSeekerPosition(45);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
});

test("playback progress is set to 'undefined' every time new audio is selected for playback", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.setPlaybackProgress(30);

    // Act & Assert
    StateMachine.playAudioNamed("Audio 2");
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    StateMachine.setPlaybackProgress(45);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    StateMachine.setPlaybackProgress(60);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
});

test("navigating through playlist when shuffle is off and repeat mode is 'None' works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });


    // Act & Assert: Navigating forward sequentially from first to last audio in playlist
    StateMachine.playAudioNamed("Audio 1");
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward when last audio in playlist is being played stops playback
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after last audio in playlist finishes playback
    for (let i = 0; i < 5; i++)
    {
        StateMachine.playNext();
        expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
        expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
        expect(StateMachine.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward sequentially from last to first audio in playlist
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(4);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-4", "audio-3"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-4", "audio-3", "audio-2"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(6);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-4", "audio-3", "audio-2", "audio-1"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(7);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward when first audio in playlist is selected for playback pauses and resets playback progress
    StateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        StateMachine.playPrevious();
        expect(StateMachine.getState().playQueue).toStrictEqual([
            "audio-1", "audio-2", "audio-3", "audio-4", "audio-4", "audio-3", "audio-2", "audio-1"
        ]);
        expect(StateMachine.getState().playingAudioIndex).toBe(7);
        expect(StateMachine.getState().secSeekerPosition).toBe(0);
        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(StateMachine.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when shuffle is off and repeat mode is 'All' works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setRepeatMode(RepeatMode.All);


    // Act & Assert: Navigating forward jumps to first audio when last audio in playlist is selected for playback
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-1", "audio-2", "audio-3", "audio-4"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(7);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: navigating backward jumps to last audio when first audio in playlist is selected for playback
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "audio-1", "audio-2", "audio-3", "audio-4", "audio-1", "audio-2", "audio-3", "audio-4", "audio-3", "audio-2", "audio-1", "audio-4"
    ]);
    expect(StateMachine.getState().playingAudioIndex).toBe(11);
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("navigating through playlist when shuffle is off and playlist is being updated works correctly", () =>
{
    // Arrange: Playing "Audio 3" then excluding "Audio 4" then playing next to reach end of playlist
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 3");
    StateMachine.setAudioExclusionStatus("Audio 4", true);
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);

    // Act: Re-including "Audio 4" at end of playlist then playing next
    StateMachine.setAudioExclusionStatus("Audio 4", false);
    StateMachine.playNext();

    // Assert: Nothing happens as end of playlist is reached
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);

    // Act & Assert: Going back to "Audio 4" instead of "Audio 3" as "Audio 4" is the new last audio of playlist
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3", "audio-4"]);
});

test("navigating through playlist when shuffle is off skips excluded audio", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 2");
    StateMachine.setAudioExclusionStatus("Audio 3", true);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2"]);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2", "audio-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2", "audio-4", "audio-2"]);


    // Arrange
    StateMachine.setPlaybackProgress(30);
    StateMachine.setAudioExclusionStatus("Audio 1", true);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2", "audio-4", "audio-2"]);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(false);


    // Arrange
    StateMachine.setIsPlaying(true);
    StateMachine.setPlaybackProgress(45);
    StateMachine.setAudioExclusionStatus("Audio 4", true);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2", "audio-4", "audio-2"]);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().isPlaying).toBe(false);
});

test("navigating through playlist when shuffle is on and repeat mode is 'None' works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);


    // Act & Assert: Playing an audio item refreshes upcoming audio items
    StateMachine.playAudioNamed("Audio 2");
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-1", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward only increases playing audio index
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward stops playback when last audio is being played
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after last audio finishes playback
    for (let i = 0; i < 5; i++)
    {
        StateMachine.playNext();
        expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
        expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
        expect(StateMachine.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward only decreases playing audio index
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        // Act
        StateMachine.playPrevious();

        // Assert: Navigating backward when first audio is selected for playback pauses and resets playback progress
        expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
        expect(StateMachine.getState().playingAudioIndex).toBe(0);
        expect(StateMachine.getState().secSeekerPosition).toBe(0);
        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(StateMachine.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when shuffle is on and repeat mode is 'All' works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.setRepeatMode(RepeatMode.All);


    // Act & Assert: Navigating forward queues up new audio items after all upcoming audio items finish playback
    StateMachine.playAudioNamed("Audio 3");
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.length).toBe(7);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-3"]);
    expect(StateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["audio-1", "audio-2", "audio-4"]);
    expect(StateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(4);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward only decreases playing audio index
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.length).toBe(7);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-3"]);
    expect(StateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["audio-1", "audio-2", "audio-4"]);
    expect(StateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        // Act
        StateMachine.playPrevious();

        // Assert: Navigating backward when first audio is selected for playback pauses and resets playback progress
        expect(StateMachine.getState().playQueue.length).toBe(7);
        expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-3"]);
        expect(StateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["audio-1", "audio-2", "audio-4"]);
        expect(StateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
        expect(StateMachine.getState().playingAudioIndex).toBe(0);
        expect(StateMachine.getState().secSeekerPosition).toBe(0);
        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(StateMachine.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when all audio is excluded works correctly", () =>
{
    [RepeatMode.None, RepeatMode.All].forEach(repeatMode =>
    {
        [false, true].forEach(isShuffleEnabled =>
        {
            ["playNext", "playPrevious"].forEach(action =>
            {
                // Arrange
                StateMachine.resetState({
                    indexedTracklist: {
                        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                        "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                        "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
                    }
                });
                StateMachine.setRepeatMode(repeatMode);
                StateMachine.setIsShuffleEnabled(isShuffleEnabled);
                StateMachine.playAudioNamed("Audio 3");
                StateMachine.setAudioExclusionStatus("Audio 1", true);
                StateMachine.setAudioExclusionStatus("Audio 2", true);
                StateMachine.setAudioExclusionStatus("Audio 3", true);
                StateMachine.setAudioExclusionStatus("Audio 4", true);

                // Act & Assert
                switch (action)
                {
                    case "playNext":
                        StateMachine.playNext();
                        expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
                        expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
                        expect(StateMachine.getState().isPlaying).toBe(false);
                        break;

                    case "playPrevious":
                        StateMachine.playPrevious();
                        expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
                        expect(StateMachine.getState().playingAudioIndex).toBe(0);
                        expect(StateMachine.getState().isPlaying).toBe(false);
                        break;

                    default:
                        throw new Error(`Not Supported Action: ${action}`);
                }
            });
        });
    });
});

test("navigating through playlist when it has only 1 audio and repeat mode is 'None' works correctly", () =>
{
    [false, true].forEach(isShuffleEnabled =>
    {
        ["playNext", "playPrevious"].forEach(action =>
        {
            // Arrange
            StateMachine.resetState({
                indexedTracklist: {
                    "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                    "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                    "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                    "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
                }
            });
            StateMachine.setRepeatMode(RepeatMode.None);
            StateMachine.setIsShuffleEnabled(isShuffleEnabled);
            StateMachine.playAudioNamed("Audio 3");
            StateMachine.setPlaybackProgress(30);
            StateMachine.setAudioExclusionStatus("Audio 1", true);
            StateMachine.setAudioExclusionStatus("Audio 2", true);
            StateMachine.setAudioExclusionStatus("Audio 4", true);

            // Act & Assert
            switch (action)
            {
                case "playNext":
                    StateMachine.playNext();
                    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
                    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
                    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
                    expect(StateMachine.getState().isPlaying).toBe(false);
                    break;

                case "playPrevious":
                    StateMachine.playPrevious();
                    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
                    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
                    expect(StateMachine.getState().playingAudioIndex).toBe(0);
                    expect(StateMachine.getState().isPlaying).toBe(false);
                    break;

                default:
                    throw new Error(`Not Supported Action: ${action}`);
            }
        });
    });
});

test("navigating through playlist when it has only 1 audio and repeat mode is 'All' works correctly", () =>
{
    [false, true].forEach(isPlaying =>
    {
        [false, true].forEach(isShuffleEnabled =>
        {
            ["playNext", "playPrevious"].forEach(action =>
            {
                // Arrange
                StateMachine.resetState({
                    indexedTracklist: {
                        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                        "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                        "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
                    }
                });
                StateMachine.setRepeatMode(RepeatMode.All);
                StateMachine.setIsShuffleEnabled(isShuffleEnabled);
                StateMachine.playAudioNamed("Audio 3");
                StateMachine.setPlaybackProgress(30);
                StateMachine.setAudioExclusionStatus("Audio 1", true);
                StateMachine.setAudioExclusionStatus("Audio 2", true);
                StateMachine.setAudioExclusionStatus("Audio 4", true);
                StateMachine.setIsPlaying(isPlaying);

                // Act & Assert
                switch (action)
                {
                    case "playNext":
                        StateMachine.playNext();
                        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
                        expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
                        expect(StateMachine.getState().secSeekerPosition).toBe(0);
                        expect(StateMachine.getState().playingAudioIndex).toBe(0);
                        expect(StateMachine.getState().isPlaying).toBe(true);
                        break;

                    case "playPrevious":
                        StateMachine.playPrevious();
                        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
                        expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
                        expect(StateMachine.getState().playingAudioIndex).toBe(0);
                        expect(StateMachine.getState().isPlaying).toBe(false);
                        break;

                    default:
                        throw new Error(`Not Supported Action: ${action}`);
                }
            });
        });
    });
});

test("navigating through playback history when shuffle is on skips excluded audio", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.playAudioNamed("Audio 2");
    StateMachine.playAudioNamed("Audio 3");
    StateMachine.playAudioNamed("Audio 4");
    StateMachine.setAudioExclusionStatus("Audio 1", true);
    StateMachine.setAudioExclusionStatus("Audio 3", true);
    expect(StateMachine.getState().playingAudioIndex).toBe(3);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);


    // Arrange
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playingAudioIndex).toBe(3);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
});

test("navigating through playback history when shuffle is on skips the playing audio", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.playAudioNamed("Audio 2");
    StateMachine.playAudioNamed("Audio 3");
    StateMachine.playAudioNamed("Audio 2");
    StateMachine.playAudioNamed("Audio 4");
    StateMachine.playAudioNamed("Audio 2");
    StateMachine.setAudioExclusionStatus("Audio 3", true);
    StateMachine.setAudioExclusionStatus("Audio 4", true);
    expect(StateMachine.getState().playingAudioIndex).toBe(5);
    expect(StateMachine.getState().playQueue.length).toBe(7);
    expect(StateMachine.getState().playQueue.slice(0, 6)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-2", "audio-4", "audio-2"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(7);
    expect(StateMachine.getState().playQueue.slice(0, 6)).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-2", "audio-4", "audio-2"]);
});

test("navigating away from end of playlist does nothing if all audio is excluded", () =>
{
    // Arrange: Shuffle is off, Repeat Mode is 'None'
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 4");
    StateMachine.playNext();
    StateMachine.setAudioExclusionStatus("Audio 1", true);
    StateMachine.setAudioExclusionStatus("Audio 2", true);
    StateMachine.setAudioExclusionStatus("Audio 3", true);
    StateMachine.setAudioExclusionStatus("Audio 4", true);
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);


    // Arrange: Shuffle is off, Repeat Mode is 'All'
    StateMachine.setRepeatMode(RepeatMode.All);
    expect(StateMachine.getState().isShuffleEnabled).toBe(false);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);


    // Arrange: Shuffle is on, Repeat Mode is 'All'
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);


    // Arrange: Shuffle is on, Repeat Mode is 'None'
    StateMachine.setRepeatMode(RepeatMode.None);
    expect(StateMachine.getState().isShuffleEnabled).toBe(true);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-4"]);
});

test("navigating forward when repeat mode is 'One' sets repeat mode to 'All'", () =>
{
    [false, true].forEach(isPlaying =>
    {
        [false, true].forEach(isShuffleEnabled =>
        {
            // Arrange
            StateMachine.resetState({
                indexedTracklist: {
                    "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                    "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                    "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                    "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
                }
            });
            StateMachine.setRepeatMode(RepeatMode.One);
            StateMachine.setIsShuffleEnabled(isShuffleEnabled);
            StateMachine.playAudioNamed("Audio 3");
            StateMachine.setPlaybackProgress(30);
            StateMachine.setIsPlaying(isPlaying);

            // Act & Assert
            StateMachine.playNext();
            expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);
        });
    });
});

test("navigating backward when repeat mode is 'One' works correctly", () =>
{
    [false, true].forEach(isPlaying =>
    {
        [false, true].forEach(isShuffleEnabled =>
        {
            // Test Data
            const indexedTracklist = {
                "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
            };

            // Arrange: Playback progress hasn't crossed back skip restart threshold
            StateMachine.resetState({indexedTracklist});
            StateMachine.setRepeatMode(RepeatMode.One);
            StateMachine.setIsShuffleEnabled(isShuffleEnabled);
            StateMachine.playAudioNamed("Audio 1");
            StateMachine.playAudioNamed("Audio 3");
            StateMachine.setPlaybackProgress(5);
            StateMachine.setBackSkipRestartThreshold(10);
            StateMachine.setIsPlaying(isPlaying);

            // Act & Assert
            StateMachine.playPrevious();
            expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);


            // Arrange: Playback progress crossed back skip restart threshold
            StateMachine.resetState({indexedTracklist});
            StateMachine.setRepeatMode(RepeatMode.One);
            StateMachine.setIsShuffleEnabled(isShuffleEnabled);
            StateMachine.playAudioNamed("Audio 1");
            StateMachine.playAudioNamed("Audio 3");
            StateMachine.setPlaybackProgress(30);
            StateMachine.setBackSkipRestartThreshold(10);
            StateMachine.setIsPlaying(isPlaying);

            // Act & Assert
            StateMachine.playPrevious();
            expect(StateMachine.getState().repeatMode).toBe(RepeatMode.One);
        });
    });
});

test("navigating backward when playlist has only 1 audio and repeat mode is 'One' works correctly", () =>
{
    [false, true].forEach(isPlaying =>
    {
        [false, true].forEach(isShuffleEnabled =>
        {
            [5, 30].forEach(secPlaybackProgress =>
            {
                // Arrange
                StateMachine.resetState({
                    indexedTracklist: {
                        "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                        "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                        "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                        "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
                    }
                });
                StateMachine.setRepeatMode(RepeatMode.One);
                StateMachine.setIsShuffleEnabled(isShuffleEnabled);
                StateMachine.setAudioExclusionStatus("Audio 1", true);
                StateMachine.setAudioExclusionStatus("Audio 2", true);
                StateMachine.setAudioExclusionStatus("Audio 4", true);
                StateMachine.setBackSkipRestartThreshold(10);
                StateMachine.playAudioNamed("Audio 3");
                StateMachine.setPlaybackProgress(secPlaybackProgress);
                StateMachine.setIsPlaying(isPlaying);

                // Act & Assert
                StateMachine.playPrevious();
                expect(StateMachine.getState().repeatMode).toBe(RepeatMode.One);
            });
        });
    });
});

test("navigating backward resets playback progress if the playing audio has been played for some time", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setBackSkipRestartThreshold(10);
    StateMachine.playAudioNamed("Audio 3");
    StateMachine.setPlaybackProgress(15);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-3"]);
    expect(StateMachine.getState().secSeekerPosition).toBe(0);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
});

test("when an audio item ends it will be replayed if repeat mode is 'One'", () =>
{
    [false, true].forEach(isShuffleEnabled =>
    {
        // Arrange
        StateMachine.resetState({
            indexedTracklist: {
                "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
            }
        });
        StateMachine.setRepeatMode(RepeatMode.One);
        StateMachine.setIsShuffleEnabled(isShuffleEnabled);
        StateMachine.playAudioNamed("Audio 3");
        StateMachine.setPlaybackProgress(30);

        // Act & Assert
        StateMachine.onAudioEnd();
        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(StateMachine.getState().secSeekerPosition).toBe(0);
        expect(StateMachine.getState().playingAudioIndex).toBe(0);
        expect(StateMachine.getState().isPlaying).toBe(true);
    });
});

test("altering playlist marks audio as included or excluded", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });

    // Act
    StateMachine.setAudioExclusionStatus("Audio 1", true);
    StateMachine.setAudioExclusionStatus("Audio 3", true);

    // Assert
    expect(StateMachine.getState().indexedTracklist["audio-1"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().indexedTracklist["audio-2"].isExcludedFromActivePlaylist).toBeFalsy();
    expect(StateMachine.getState().indexedTracklist["audio-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().indexedTracklist["audio-4"].isExcludedFromActivePlaylist).toBeFalsy();


    // Act & Assert
    StateMachine.setAudioExclusionStatus("Audio 1", false);
    expect(StateMachine.getState().indexedTracklist["audio-1"].isExcludedFromActivePlaylist).toBe(false);
    expect(StateMachine.getState().indexedTracklist["audio-2"].isExcludedFromActivePlaylist).toBeFalsy();
    expect(StateMachine.getState().indexedTracklist["audio-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().indexedTracklist["audio-4"].isExcludedFromActivePlaylist).toBeFalsy();
});

test("altering playlist doesn't interrupt playback even if the playing audio is excluded midway", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Excluding an audio item
    StateMachine.setAudioExclusionStatus("Audio 3", true);
    expect(StateMachine.getState().indexedTracklist["audio-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Including an audio item
    StateMachine.setAudioExclusionStatus("Audio 3", false);
    expect(StateMachine.getState().indexedTracklist["audio-3"].isExcludedFromActivePlaylist).toBe(false);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Current playing audio continues to play even if it is being excluded
    StateMachine.setAudioExclusionStatus("Audio 1", true);
    expect(StateMachine.getState().indexedTracklist["audio-1"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("altering playlist doesn't change play queue when shuffle is off", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4", "audio-3", "audio-2"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.setAudioExclusionStatus("Audio 3", true);
    expect(StateMachine.getState().indexedTracklist["audio-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4", "audio-3", "audio-2"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playingAudioIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("altering playlist refreshes upcoming audio items when shuffle is on", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.playNext();
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-2", "audio-3", "audio-4"]);

    // Act: Excluding playing audio
    const state = StateMachine.getState();
    const playingAudioUri = state.playQueue[state.playingAudioIndex!];
    const playingAudioName = state.indexedTracklist[playingAudioUri].audioName;
    StateMachine.setAudioExclusionStatus(playingAudioName, true);

    // Assert
    expect(playingAudioUri).toBeDefined();
    expect(playingAudioName).toBeDefined();
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().indexedTracklist[playingAudioUri].isExcludedFromActivePlaylist).toBe(true);


    // Arrange
    StateMachine.setAudioExclusionStatus(playingAudioName, false);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);

    // Act: Excluding non-playing audio
    const nonPlayingAudioUri = playingAudioUri !== "audio-3" ? "audio-3" : "audio-4";
    const nonPlayingAudioName = state.indexedTracklist[nonPlayingAudioUri].audioName;
    const nonExcludedAudioUri = nonPlayingAudioUri !== "audio-3" ? "audio-3" : "audio-4";
    StateMachine.setAudioExclusionStatus(nonPlayingAudioName, true);

    // Assert
    expect(nonPlayingAudioUri).toBeDefined();
    expect(nonPlayingAudioName).toBeDefined();
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-1", "audio-2", nonExcludedAudioUri]);
    expect(StateMachine.getState().indexedTracklist[nonPlayingAudioUri].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing audio and navigating away when shuffle is off works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 2");
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2"]);

    // Act
    StateMachine.setAudioExclusionStatus("Audio 2", true);
    StateMachine.playNext();

    // Assert
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2", "audio-3"]);
    expect(StateMachine.getState().indexedTracklist["audio-2"].isExcludedFromActivePlaylist).toBe(true);


    // Act
    StateMachine.setAudioExclusionStatus("Audio 3", true);
    StateMachine.playPrevious();

    // Assert
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2", "audio-3", "audio-1"]);
    expect(StateMachine.getState().indexedTracklist["audio-3"].isExcludedFromActivePlaylist).toBe(true);


    // Act
    StateMachine.setAudioExclusionStatus("Audio 1", true);
    StateMachine.playPrevious();

    // Assert
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-2", "audio-3", "audio-1"]);
    expect(StateMachine.getState().indexedTracklist["audio-1"].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing audio and navigating forward when shuffle is on works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playAudioNamed("Audio 2");
    StateMachine.playNext();
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-1", "audio-3", "audio-4"]);

    // Act
    const state = StateMachine.getState();
    const playingAudioUri = state.playQueue[state.playingAudioIndex!];
    const playingAudioName = state.indexedTracklist[playingAudioUri].audioName;
    StateMachine.setAudioExclusionStatus(playingAudioName, true);
    StateMachine.playNext();

    // Assert
    expect(playingAudioUri).toBeDefined();
    expect(playingAudioName).toBeDefined();
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().indexedTracklist[playingAudioUri].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing audio and navigating backward when shuffle is on works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playAudioNamed("Audio 2");
    StateMachine.playNext();
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-1", "audio-3", "audio-4"]);

    // Act
    const state = StateMachine.getState();
    const playingAudioUri = state.playQueue[state.playingAudioIndex!];
    const playingAudioName = state.indexedTracklist[playingAudioUri].audioName;
    StateMachine.setAudioExclusionStatus(playingAudioName, true);
    StateMachine.playPrevious();

    // Assert
    expect(playingAudioUri).toBeDefined();
    expect(playingAudioName).toBeDefined();
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-1", "audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().indexedTracklist[playingAudioUri].isExcludedFromActivePlaylist).toBe(true);


    // Act
    StateMachine.setAudioExclusionStatus("Audio 2", true);
    StateMachine.playPrevious();

    // Assert
    const sortedNonExcludedNonPlayingAudioItems = ["audio-1", "audio-3", "audio-4"].filter(x => x !== playingAudioUri);
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(sortedNonExcludedNonPlayingAudioItems);
    expect(StateMachine.getState().indexedTracklist["audio-2"].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing audio while seeker position is being set works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 2");
    StateMachine.setSeekerPosition(30);

    // Act & Assert
    StateMachine.setAudioExclusionStatus("Audio 2", true);
    expect(StateMachine.getState().secSeekerPosition).toBe(30);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("excluding non-playing audio while repeat mode is 'One' preserves repeat mode", () =>
{
    [false, true].forEach(isPlaying =>
    {
        [false, true].forEach(isShuffleEnabled =>
        {
            // Arrange
            StateMachine.resetState({
                indexedTracklist: {
                    "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                    "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                    "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                    "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
                }
            });
            StateMachine.setRepeatMode(RepeatMode.One);
            StateMachine.setIsShuffleEnabled(isShuffleEnabled);
            StateMachine.playAudioNamed("Audio 2");
            StateMachine.setSeekerPosition(30);
            StateMachine.setIsPlaying(isPlaying);

            // Act & Assert
            StateMachine.setAudioExclusionStatus("Audio 1", true);
            StateMachine.setAudioExclusionStatus("Audio 3", true);
            expect(StateMachine.getState().repeatMode).toBe(RepeatMode.One);
        });
    });
});

test("excluding playing audio while repeat mode is 'One' sets repeat mode to 'All'", () =>
{
    [false, true].forEach(isPlaying =>
    {
        [false, true].forEach(isShuffleEnabled =>
        {
            // Arrange
            StateMachine.resetState({
                indexedTracklist: {
                    "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
                    "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
                    "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
                    "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
                }
            });
            StateMachine.setRepeatMode(RepeatMode.One);
            StateMachine.setIsShuffleEnabled(isShuffleEnabled);
            StateMachine.playAudioNamed("Audio 2");
            StateMachine.setSeekerPosition(30);
            StateMachine.setIsPlaying(isPlaying);

            // Act & Assert
            StateMachine.setAudioExclusionStatus("Audio 2", true);
            expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);
        });
    });
});

test("invoking actions when playback is paused works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "audio-1": {audioName: "Audio 1", secAudioDuration: 74},
            "audio-2": {audioName: "Audio 2", secAudioDuration: 86},
            "audio-3": {audioName: "Audio 3", secAudioDuration: 149},
            "audio-4": {audioName: "Audio 4", secAudioDuration: 264}
        }
    });
    StateMachine.playAudioNamed("Audio 1");
    StateMachine.setPlaybackProgress(30);
    StateMachine.setIsPlaying(false);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().isShuffleEnabled).toBe(true);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playQueue.length).toStrictEqual(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["audio-2", "audio-3", "audio-4"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().isShuffleEnabled).toBe(false);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setRepeatMode(RepeatMode.All);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setRepeatMode(RepeatMode.None);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.None);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.setIsPlaying(false);
    StateMachine.setPlaybackProgress(45);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-1"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.setIsPlaying(false);
    StateMachine.setPlaybackProgress(60);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().secPlaybackProgress).toBe(60);
    expect(StateMachine.getState().playQueue).toStrictEqual(["audio-1", "audio-2", "audio-1"]);
    expect(StateMachine.getState().playingAudioIndex).toBe(2);


    // Arrange
    StateMachine.setIsPlaying(false);

    // Act & Assert
    StateMachine.setPlaybackProgress(65);
    expect(StateMachine.getState().secPlaybackProgress).toBe(65);
    expect(StateMachine.getState().isPlaying).toBe(false);
});

test("invoking actions when tracklist is empty works correctly", () =>
{
    // Arrange
    StateMachine.resetState();

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().isShuffleEnabled).toBe(true);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().isShuffleEnabled).toBe(false);

    // Act & Assert
    StateMachine.setRepeatMode(RepeatMode.All);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);

    // Act & Assert
    StateMachine.setRepeatMode(RepeatMode.None);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.None);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(StateMachine.getState().playQueue).toStrictEqual([]);
    expect(StateMachine.getState().playingAudioIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(StateMachine.getState().playQueue).toStrictEqual([]);
    expect(StateMachine.getState().playingAudioIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(StateMachine.getState().playQueue).toStrictEqual([]);
    expect(StateMachine.getState().playingAudioIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
});
