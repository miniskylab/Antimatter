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
    expect(StateMachine.getState().playingSongIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().secBackSkipRestartThreshold).toBeUndefined();
    expect(StateMachine.getState().isSeekingInProgress).toBe(false);
    expect(StateMachine.getState().isShuffleEnabled).toBe(false);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.None);

    // Act & Assert
    const playQueue = ["test-song"];
    const indexedTracklist = {"test-song": {songName: "Test Song", secSongDuration: 98}};
    StateMachine.resetState({indexedTracklist, playQueue, isShuffleEnabled: true, repeatMode: RepeatMode.All});
    expect(StateMachine.getState().indexedTracklist).toStrictEqual(indexedTracklist);
    expect(StateMachine.getState().indexedTracklist).not.toBe(indexedTracklist);
    expect(StateMachine.getState().playQueue).toStrictEqual(playQueue);
    expect(StateMachine.getState().playQueue).not.toBe(playQueue);
    expect(StateMachine.getState().playingSongIndex).toBeUndefined();
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
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149},
        "song-4": {songName: "Song 4", secSongDuration: 264}
    };

    // Arrange
    StateMachine.resetState({indexedTracklist: {"test-song": {songName: "Test Song", secSongDuration: 98}}});
    StateMachine.setRepeatMode(RepeatMode.All);
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.setBackSkipRestartThreshold(10);
    StateMachine.playSongNamed("Test Song");
    StateMachine.setPlaybackProgress(30);
    StateMachine.setSeekerPosition(40);
    expect(StateMachine.getState().playQueue).toStrictEqual(["test-song"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
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
    expect(StateMachine.getState().playingSongIndex).toBeUndefined();
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

test("turning shuffle on queues up new songs if there is a song selected for playing", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149}
    };

    // Arrange: Playback is playing
    StateMachine.resetState({indexedTracklist});
    StateMachine.playSongNamed("Song 1");
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);


    // Arrange: Playback is paused
    StateMachine.resetState({indexedTracklist});
    StateMachine.playSongNamed("Song 1");
    StateMachine.setIsPlaying(false);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);
});

test("turning shuffle off clears upcoming songs if there is a song selected for playing", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149}
    };

    // Arrange: Playback is playing
    StateMachine.resetState({indexedTracklist});
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playSongNamed("Song 1");
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);


    // Arrange: Playback is paused
    StateMachine.resetState({indexedTracklist});
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playSongNamed("Song 1");
    StateMachine.setIsPlaying(false);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
});

test("turning shuffle on and off doesn't alter play queue if there is no song selected for playing", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149}
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


    // Arrange: All songs have finished playing
    StateMachine.resetState({indexedTracklist});
    StateMachine.playSongNamed("Song 3");
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);


    // Arrange
    StateMachine.setRepeatMode(RepeatMode.All);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
});

test("setting repeat mode works correctly", () =>
{
    // Arrange
    StateMachine.resetState();

    // Act & Assert
    StateMachine.setRepeatMode(RepeatMode.All);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);

    [undefined, null, RepeatMode.None].forEach((repeatMode: RepeatMode) =>
    {
        // Arrange
        StateMachine.resetState();

        // Act & Assert
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
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 1");
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);

    // Act & Assert
    StateMachine.setIsPlaying(false);
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
});

test("resuming playback plays the first song in playlist when shuffle is off and there is no song selected for playing", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149}
    };

    [RepeatMode.None, RepeatMode.All].forEach(repeatMode =>
    {
        // Arrange
        StateMachine.resetState({indexedTracklist});
        StateMachine.setRepeatMode(repeatMode);

        // Act & Assert
        StateMachine.setIsPlaying(true);
        expect(StateMachine.getState().isPlaying).toBe(true);
        expect(StateMachine.getState().playingSongIndex).toBe(0);
        expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    });


    // Arrange
    StateMachine.resetState({indexedTracklist});
    StateMachine.playSongNamed("Song 3");
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3", "song-1"]);
});

test("resuming playback plays a random song in playlist when shuffle is on and there is no song selected for playing", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149}
    };

    const tryCount = 50;
    let playedSongUriFromPreviousTest: string | undefined = undefined;
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
            expect(StateMachine.getState().playingSongIndex).toBe(0);
            expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3"]);

            const state = StateMachine.getState();
            const playingSongUri = state.playQueue[state.playingSongIndex!];
            if (playedSongUriFromPreviousTest !== undefined && playedSongUriFromPreviousTest !== playingSongUri)
            {
                break;
            }
            else if (i === tryCount)
            {
                throw new Error(`played song is expected to be random but instead is '${playingSongUri}' ${tryCount} times in a row!`);
            }

            playedSongUriFromPreviousTest = playingSongUri;
        }
    });

    playedSongUriFromPreviousTest = undefined;
    for (let i = 1; i <= tryCount; i++)
    {
        // Arrange
        StateMachine.resetState({indexedTracklist});
        StateMachine.setIsShuffleEnabled(true);
        StateMachine.playSongNamed("Song 1");
        StateMachine.playNext();
        StateMachine.playNext();
        StateMachine.playNext();
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
        expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3"]);

        // Act
        StateMachine.setIsPlaying(true);

        // Assert
        expect(StateMachine.getState().isPlaying).toBe(true);
        if (StateMachine.getState().playingSongIndex === 2)
        {
            expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3"]);
        }
        else
        {
            expect(StateMachine.getState().playingSongIndex).toBe(3);
            expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual([
                "song-1", "song-1", "song-2", "song-2", "song-3", "song-3"
            ]);
        }

        const state = StateMachine.getState();
        const playingSongUri = state.playQueue[state.playingSongIndex!];
        if (playedSongUriFromPreviousTest !== undefined && playedSongUriFromPreviousTest !== playingSongUri)
        {
            break;
        }
        else if (i === tryCount)
        {
            throw new Error(`played song is expected to be random but instead is '${playingSongUri}' ${tryCount} times in a row!`);
        }

        playedSongUriFromPreviousTest = playingSongUri;
    }
});

test("resuming playback does nothing if all songs are excluded and there is no song selected for playing", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149},
        "song-4": {songName: "Song 4", secSongDuration: 264}
    };

    [false, true].forEach(isShuffleEnabled =>
    {
        // Arrange
        StateMachine.resetState({indexedTracklist});
        StateMachine.setIsShuffleEnabled(isShuffleEnabled);
        StateMachine.setSongExclusionStatus("Song 1", true);
        StateMachine.setSongExclusionStatus("Song 2", true);
        StateMachine.setSongExclusionStatus("Song 3", true);
        StateMachine.setSongExclusionStatus("Song 4", true);

        // Act & Assert
        StateMachine.setIsPlaying(true);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().playingSongIndex).toBeUndefined();
        expect(StateMachine.getState().playQueue).toStrictEqual([]);


        // Arrange
        StateMachine.resetState({indexedTracklist});
        StateMachine.setIsShuffleEnabled(isShuffleEnabled);
        StateMachine.playSongNamed("Song 1");
        StateMachine.playNext();
        StateMachine.playNext();
        StateMachine.playNext();
        StateMachine.playNext();
        StateMachine.setSongExclusionStatus("Song 1", true);
        StateMachine.setSongExclusionStatus("Song 2", true);
        StateMachine.setSongExclusionStatus("Song 3", true);
        StateMachine.setSongExclusionStatus("Song 4", true);
        expect(StateMachine.getState().playingSongIndex).toBe(Infinity);

        // Act & Assert
        StateMachine.setIsPlaying(true);
        expect(StateMachine.getState().isPlaying).toBe(false);
        expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
        expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    });
});

test("resuming playback synchronizes playback progress with seeker position", () =>
{
    // Arrange
    StateMachine.resetState({indexedTracklist: {"song-3": {songName: "Song 3", secSongDuration: 149}}});
    StateMachine.playSongNamed("Song 3");
    StateMachine.setPlaybackProgress(30);
    StateMachine.setSeekerPosition(40);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().secPlaybackProgress).toBe(40);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
});

test("playing a specific song when shuffle is off works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 1");
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.setPlaybackProgress(30);
    StateMachine.setSeekerPosition(45);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.playSongNamed("Song 4");
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act
    StateMachine.playSongNamed("Song 2");

    // Assert: State is correct
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-2"]);
    expect(StateMachine.getState().playingSongIndex).toBe(4);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating forward sequentially to the last song in the playlist works correctly
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-2", "song-3"]);
    expect(StateMachine.getState().playingSongIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(6);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act
    StateMachine.playSongNamed("Song 3");

    // Assert: State is correct
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(7);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating backward sequentially to the first song in the playlist works correctly
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3", "song-2"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(8);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(9);
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("playing a specific song when shuffle is on works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);

    // Act & Assert
    StateMachine.playSongNamed("Song 1");
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.playSongNamed("Song 3");
    expect(StateMachine.getState().playingSongIndex).toBe(1);

    // Act
    StateMachine.playSongNamed("Song 4");

    // Assert: State is correct
    expect(StateMachine.getState().playQueue.slice(0, 2)).toStrictEqual(["song-1", "song-3"]);
    expect(StateMachine.getState().playQueue[2]).toBe("song-4");
    expect(StateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3"]);
    expect(StateMachine.getState().playQueue.length).toBe(6);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating backward works correctly
    StateMachine.playPrevious();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Assert: Navigating forward works correctly
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(4);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(normalize(StateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().isPlaying).toBe(false);
});

test("setting seeker position works correctly", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149},
        "song-4": {songName: "Song 4", secSongDuration: 264}
    };

    // Arrange: No playing song
    StateMachine.resetState({indexedTracklist});

    // Act & Assert
    StateMachine.setSeekerPosition(24);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();


    // Arrange: Playing song is not excluded
    StateMachine.resetState({indexedTracklist});
    StateMachine.playSongNamed("Song 1");

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
        // Arrange: Playing song is excluded
        StateMachine.resetState({indexedTracklist});
        StateMachine.playSongNamed("Song 2");
        StateMachine.setSongExclusionStatus("Song 2", true);
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
    StateMachine.resetState({indexedTracklist: {"song-1": {songName: "Song 1", secSongDuration: 74}}});

    // Act & Assert
    StateMachine.setPlaybackProgress(24);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    StateMachine.playSongNamed("Song 1");

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
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);

    // Act & Assert
    StateMachine.setPlaybackProgress(32);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
});

test("changing playing song resets seeker position", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149}
        }
    });
    StateMachine.playSongNamed("Song 1");
    StateMachine.setSeekerPosition(15);

    // Act & Assert
    StateMachine.playSongNamed("Song 2");
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

test("playback progress is set to 'undefined' every time a new song is selected for playing", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 1");
    StateMachine.setPlaybackProgress(30);

    // Act & Assert
    StateMachine.playSongNamed("Song 2");
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
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });


    // Act & Assert: Navigating forward sequentially from the first to the last song in the playlist
    StateMachine.playSongNamed("Song 1");
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2"]);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3"]);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward when the last song in the playlist is being played stops playback
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after the last song in the playlist finished playing
    for (let i = 0; i < 5; i++)
    {
        StateMachine.playNext();
        expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
        expect(StateMachine.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward sequentially from the last to the first song in the playlist
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(4);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(6);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2", "song-1"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(7);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward when the first song in the playlist is selected for playing pauses and resets playback progress
    StateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        StateMachine.playPrevious();
        expect(StateMachine.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2", "song-1"
        ]);
        expect(StateMachine.getState().playingSongIndex).toBe(7);
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
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setRepeatMode(RepeatMode.All);


    // Act & Assert: Navigating forward jumps to the first song when the last song in the playlist is selected for playing
    StateMachine.playSongNamed("Song 1");
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(7);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: navigating backward jumps to the last song when the first song in the playlist is selected for playing
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1", "song-4"
    ]);
    expect(StateMachine.getState().playingSongIndex).toBe(11);
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("navigating through playlist when shuffle is off and playlist is being updated works correctly", () =>
{
    // Arrange: Playing "Song 3" then excluding "Song 4" then playing next to reach the end of the playlist
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 3");
    StateMachine.setSongExclusionStatus("Song 4", true);
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act: Re-including "Song 4" at the end of the playlist then playing next
    StateMachine.setSongExclusionStatus("Song 4", false);
    StateMachine.playNext();

    // Assert: Nothing happens as the end of the playlist is reached
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert: Going back to "Song 4" instead of "Song 3" as "Song 4" is the new last song of the playlist
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3", "song-4"]);
});

test("navigating through playlist when shuffle is off skips excluded songs", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 2");
    StateMachine.setSongExclusionStatus("Song 3", true);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2"]);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2", "song-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);


    // Arrange
    StateMachine.setPlaybackProgress(30);
    StateMachine.setSongExclusionStatus("Song 1", true);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(false);


    // Arrange
    StateMachine.setIsPlaying(true);
    StateMachine.setPlaybackProgress(45);
    StateMachine.setSongExclusionStatus("Song 4", true);
    expect(StateMachine.getState().playingSongIndex).toBe(2);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().isPlaying).toBe(false);
});

test("navigating through playlist when shuffle is on and repeat mode is 'None' works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);


    // Act & Assert: Playing a song refreshes upcoming songs
    StateMachine.playSongNamed("Song 2");
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward only increases playing song index
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward stops playback when the last song is being played
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after the last song finished playing
    for (let i = 0; i < 5; i++)
    {
        StateMachine.playNext();
        expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
        expect(StateMachine.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward only decreases playing song index
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(3);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        // Act
        StateMachine.playPrevious();

        // Assert: Navigating backward when the first song is selected for playing pauses and resets playback progress
        expect(StateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(StateMachine.getState().playingSongIndex).toBe(0);
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
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.setRepeatMode(RepeatMode.All);


    // Act & Assert: Navigating forward queues up new songs after all upcoming songs finished playing
    StateMachine.playSongNamed("Song 3");
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    expect(StateMachine.getState().playQueue.length).toBe(7);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
    expect(StateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
    expect(StateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(4);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward only decreases playing song index
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    expect(StateMachine.getState().playQueue.length).toBe(7);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
    expect(StateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
    expect(StateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        // Act
        StateMachine.playPrevious();

        // Assert: Navigating backward when the first song is selected for playing pauses and resets playback progress
        expect(StateMachine.getState().playQueue.length).toBe(7);
        expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
        expect(StateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
        expect(StateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(StateMachine.getState().playingSongIndex).toBe(0);
        expect(StateMachine.getState().secSeekerPosition).toBe(0);
        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(StateMachine.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when all songs are excluded works correctly", () =>
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
                        "song-1": {songName: "Song 1", secSongDuration: 74},
                        "song-2": {songName: "Song 2", secSongDuration: 86},
                        "song-3": {songName: "Song 3", secSongDuration: 149},
                        "song-4": {songName: "Song 4", secSongDuration: 264}
                    }
                });
                StateMachine.setRepeatMode(repeatMode);
                StateMachine.setIsShuffleEnabled(isShuffleEnabled);
                StateMachine.playSongNamed("Song 3");
                StateMachine.setSongExclusionStatus("Song 1", true);
                StateMachine.setSongExclusionStatus("Song 2", true);
                StateMachine.setSongExclusionStatus("Song 3", true);
                StateMachine.setSongExclusionStatus("Song 4", true);

                // Act & Assert
                switch (action)
                {
                    case "playNext":
                        StateMachine.playNext();
                        expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
                        expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
                        expect(StateMachine.getState().isPlaying).toBe(false);
                        break;

                    case "playPrevious":
                        StateMachine.playPrevious();
                        expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
                        expect(StateMachine.getState().playingSongIndex).toBe(0);
                        expect(StateMachine.getState().isPlaying).toBe(false);
                        break;

                    default:
                        throw new Error(`Not Supported Action: ${action}`);
                }
            });
        });
    });
});

test("navigating through playlist when it has only 1 song and repeat mode is 'None' works correctly", () =>
{
    [false, true].forEach(isShuffleEnabled =>
    {
        ["playNext", "playPrevious"].forEach(action =>
        {
            // Arrange
            StateMachine.resetState({
                indexedTracklist: {
                    "song-1": {songName: "Song 1", secSongDuration: 74},
                    "song-2": {songName: "Song 2", secSongDuration: 86},
                    "song-3": {songName: "Song 3", secSongDuration: 149},
                    "song-4": {songName: "Song 4", secSongDuration: 264}
                }
            });
            StateMachine.setRepeatMode(RepeatMode.None);
            StateMachine.setIsShuffleEnabled(isShuffleEnabled);
            StateMachine.playSongNamed("Song 3");
            StateMachine.setPlaybackProgress(30);
            StateMachine.setSongExclusionStatus("Song 1", true);
            StateMachine.setSongExclusionStatus("Song 2", true);
            StateMachine.setSongExclusionStatus("Song 4", true);

            // Act & Assert
            switch (action)
            {
                case "playNext":
                    StateMachine.playNext();
                    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
                    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
                    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
                    expect(StateMachine.getState().isPlaying).toBe(false);
                    break;

                case "playPrevious":
                    StateMachine.playPrevious();
                    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
                    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
                    expect(StateMachine.getState().playingSongIndex).toBe(0);
                    expect(StateMachine.getState().isPlaying).toBe(false);
                    break;

                default:
                    throw new Error(`Not Supported Action: ${action}`);
            }
        });
    });
});

test("navigating through playlist when it has only 1 song and repeat mode is 'All' works correctly", () =>
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
                        "song-1": {songName: "Song 1", secSongDuration: 74},
                        "song-2": {songName: "Song 2", secSongDuration: 86},
                        "song-3": {songName: "Song 3", secSongDuration: 149},
                        "song-4": {songName: "Song 4", secSongDuration: 264}
                    }
                });
                StateMachine.setRepeatMode(RepeatMode.All);
                StateMachine.setIsShuffleEnabled(isShuffleEnabled);
                StateMachine.playSongNamed("Song 3");
                StateMachine.setPlaybackProgress(30);
                StateMachine.setSongExclusionStatus("Song 1", true);
                StateMachine.setSongExclusionStatus("Song 2", true);
                StateMachine.setSongExclusionStatus("Song 4", true);
                StateMachine.setIsPlaying(isPlaying);

                // Act & Assert
                switch (action)
                {
                    case "playNext":
                        StateMachine.playNext();
                        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
                        expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
                        expect(StateMachine.getState().playingSongIndex).toBe(0);
                        expect(StateMachine.getState().isPlaying).toBe(true);
                        break;

                    case "playPrevious":
                        StateMachine.playPrevious();
                        expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
                        expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
                        expect(StateMachine.getState().playingSongIndex).toBe(0);
                        expect(StateMachine.getState().isPlaying).toBe(false);
                        break;

                    default:
                        throw new Error(`Not Supported Action: ${action}`);
                }
            });
        });
    });
});

test("navigating through playback history when shuffle is on skips excluded songs", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playSongNamed("Song 1");
    StateMachine.playSongNamed("Song 2");
    StateMachine.playSongNamed("Song 3");
    StateMachine.playSongNamed("Song 4");
    StateMachine.setSongExclusionStatus("Song 1", true);
    StateMachine.setSongExclusionStatus("Song 3", true);
    expect(StateMachine.getState().playingSongIndex).toBe(3);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);


    // Arrange
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playingSongIndex).toBe(3);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
});

test("navigating through playback history when shuffle is on skips the playing song", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playSongNamed("Song 1");
    StateMachine.playSongNamed("Song 2");
    StateMachine.playSongNamed("Song 3");
    StateMachine.playSongNamed("Song 2");
    StateMachine.playSongNamed("Song 4");
    StateMachine.playSongNamed("Song 2");
    StateMachine.setSongExclusionStatus("Song 3", true);
    StateMachine.setSongExclusionStatus("Song 4", true);
    expect(StateMachine.getState().playingSongIndex).toBe(5);
    expect(StateMachine.getState().playQueue.length).toBe(7);
    expect(StateMachine.getState().playQueue.slice(0, 6)).toStrictEqual(["song-1", "song-2", "song-3", "song-2", "song-4", "song-2"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(7);
    expect(StateMachine.getState().playQueue.slice(0, 6)).toStrictEqual(["song-1", "song-2", "song-3", "song-2", "song-4", "song-2"]);
});

test("navigating away from the end of playlist does nothing if all songs are excluded", () =>
{
    // Arrange: Shuffle is off, Repeat Mode is 'None'
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 4");
    StateMachine.playNext();
    StateMachine.setSongExclusionStatus("Song 1", true);
    StateMachine.setSongExclusionStatus("Song 2", true);
    StateMachine.setSongExclusionStatus("Song 3", true);
    StateMachine.setSongExclusionStatus("Song 4", true);
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is off, Repeat Mode is 'All'
    StateMachine.setRepeatMode(RepeatMode.All);
    expect(StateMachine.getState().isShuffleEnabled).toBe(false);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is on, Repeat Mode is 'All'
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is on, Repeat Mode is 'None'
    StateMachine.setRepeatMode(RepeatMode.None);
    expect(StateMachine.getState().isShuffleEnabled).toBe(true);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-4"]);
});

test("navigating backward resets playback progress if the playing song has been played for some time", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setBackSkipRestartThreshold(10);
    StateMachine.playSongNamed("Song 3");
    StateMachine.setPlaybackProgress(15);
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-3"]);
    expect(StateMachine.getState().secSeekerPosition).toBe(0);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
});

test("altering playlist marks songs as included or excluded", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });

    // Act
    StateMachine.setSongExclusionStatus("Song 1", true);
    StateMachine.setSongExclusionStatus("Song 3", true);

    // Assert
    expect(StateMachine.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBeFalsy();
    expect(StateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().indexedTracklist["song-4"].isExcludedFromActivePlaylist).toBeFalsy();


    // Act & Assert
    StateMachine.setSongExclusionStatus("Song 1", false);
    expect(StateMachine.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(false);
    expect(StateMachine.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBeFalsy();
    expect(StateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().indexedTracklist["song-4"].isExcludedFromActivePlaylist).toBeFalsy();
});

test("altering playlist doesn't interrupt playback even if the playing song is excluded midway", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 1");
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Excluding a song
    StateMachine.setSongExclusionStatus("Song 3", true);
    expect(StateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Including a song
    StateMachine.setSongExclusionStatus("Song 3", false);
    expect(StateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(false);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Current playing song continues to play even if it is being excluded
    StateMachine.setSongExclusionStatus("Song 1", true);
    expect(StateMachine.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("altering playlist doesn't change play queue when shuffle is off", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 1");
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playNext();
    StateMachine.playPrevious();
    StateMachine.playPrevious();
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-3", "song-2"]);
    expect(StateMachine.getState().playingSongIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.setSongExclusionStatus("Song 3", true);
    expect(StateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-3", "song-2"]);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playingSongIndex).toBe(5);
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("altering playlist refreshes upcoming songs when shuffle is on", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playSongNamed("Song 1");
    StateMachine.playNext();
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3", "song-4"]);

    // Act: Excluding playing song
    const state = StateMachine.getState();
    const playingSongUri = state.playQueue[state.playingSongIndex!];
    const playingSongName = state.indexedTracklist[playingSongUri].songName;
    StateMachine.setSongExclusionStatus(playingSongName, true);

    // Assert
    expect(playingSongUri).toBeDefined();
    expect(playingSongName).toBeDefined();
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);


    // Arrange
    StateMachine.setSongExclusionStatus(playingSongName, false);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act: Excluding non-playing song
    const nonPlayingSongUri = playingSongUri !== "song-3" ? "song-3" : "song-4";
    const nonPlayingSongName = state.indexedTracklist[nonPlayingSongUri].songName;
    const nonExcludedSongUri = nonPlayingSongUri !== "song-3" ? "song-3" : "song-4";
    StateMachine.setSongExclusionStatus(nonPlayingSongName, true);

    // Assert
    expect(nonPlayingSongUri).toBeDefined();
    expect(nonPlayingSongName).toBeDefined();
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", nonExcludedSongUri]);
    expect(StateMachine.getState().indexedTracklist[nonPlayingSongUri].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song and navigating away when shuffle is off works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 2");
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2"]);

    // Act
    StateMachine.setSongExclusionStatus("Song 2", true);
    StateMachine.playNext();

    // Assert
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2", "song-3"]);
    expect(StateMachine.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBe(true);


    // Act
    StateMachine.setSongExclusionStatus("Song 3", true);
    StateMachine.playPrevious();

    // Assert
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2", "song-3", "song-1"]);
    expect(StateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);


    // Act
    StateMachine.setSongExclusionStatus("Song 1", true);
    StateMachine.playPrevious();

    // Assert
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-2", "song-3", "song-1"]);
    expect(StateMachine.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song and navigating forward when shuffle is on works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playSongNamed("Song 2");
    StateMachine.playNext();
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);

    // Act
    const state = StateMachine.getState();
    const playingSongUri = state.playQueue[state.playingSongIndex!];
    const playingSongName = state.indexedTracklist[playingSongUri].songName;
    StateMachine.setSongExclusionStatus(playingSongName, true);
    StateMachine.playNext();

    // Assert
    expect(playingSongUri).toBeDefined();
    expect(playingSongName).toBeDefined();
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song and navigating backward when shuffle is on works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.setIsShuffleEnabled(true);
    StateMachine.playSongNamed("Song 2");
    StateMachine.playNext();
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().playQueue.length).toBe(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);

    // Act
    const state = StateMachine.getState();
    const playingSongUri = state.playQueue[state.playingSongIndex!];
    const playingSongName = state.indexedTracklist[playingSongUri].songName;
    StateMachine.setSongExclusionStatus(playingSongName, true);
    StateMachine.playPrevious();

    // Assert
    expect(playingSongUri).toBeDefined();
    expect(playingSongName).toBeDefined();
    expect(StateMachine.getState().isPlaying).toBe(true);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(5);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);


    // Act
    StateMachine.setSongExclusionStatus("Song 2", true);
    StateMachine.playPrevious();

    // Assert
    const sortedNonExcludedNonPlayingSongs = ["song-1", "song-3", "song-4"].filter(x => x !== playingSongUri);
    expect(StateMachine.getState().isPlaying).toBe(false);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().playQueue.length).toBe(3);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(sortedNonExcludedNonPlayingSongs);
    expect(StateMachine.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song while seeker position is being set works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 2");
    StateMachine.setSeekerPosition(30);

    // Act & Assert
    StateMachine.setSongExclusionStatus("Song 2", true);
    expect(StateMachine.getState().secSeekerPosition).toBe(30);
    expect(StateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().secSeekerPosition).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(true);
});

test("invoking actions when playback is paused works correctly", () =>
{
    // Arrange
    StateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    StateMachine.playSongNamed("Song 1");
    StateMachine.setPlaybackProgress(30);
    StateMachine.setIsPlaying(false);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(true);
    expect(StateMachine.getState().isShuffleEnabled).toBe(true);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playQueue.length).toStrictEqual(4);
    expect(StateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3", "song-4"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setIsShuffleEnabled(false);
    expect(StateMachine.getState().isShuffleEnabled).toBe(false);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setRepeatMode(RepeatMode.All);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.All);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setRepeatMode(RepeatMode.None);
    expect(StateMachine.getState().repeatMode).toBe(RepeatMode.None);
    expect(StateMachine.getState().secPlaybackProgress).toBe(30);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(StateMachine.getState().playingSongIndex).toBe(0);
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.playNext();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2"]);
    expect(StateMachine.getState().playingSongIndex).toBe(1);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.setIsPlaying(false);
    StateMachine.setPlaybackProgress(45);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);
    expect(StateMachine.getState().playingSongIndex).toBe(2);
    expect(StateMachine.getState().isPlaying).toBe(true);


    // Arrange
    StateMachine.setIsPlaying(false);
    StateMachine.setPlaybackProgress(60);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().secPlaybackProgress).toBe(60);
    expect(StateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);
    expect(StateMachine.getState().playingSongIndex).toBe(2);


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
    expect(StateMachine.getState().playingSongIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.playPrevious();
    expect(StateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(StateMachine.getState().playQueue).toStrictEqual([]);
    expect(StateMachine.getState().playingSongIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setIsPlaying(true);
    expect(StateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(StateMachine.getState().playQueue).toStrictEqual([]);
    expect(StateMachine.getState().playingSongIndex).toBeUndefined();
    expect(StateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    StateMachine.setPlaybackProgress(30);
    expect(StateMachine.getState().secPlaybackProgress).toBeUndefined();
});
