import {RepeatMode} from "../enums";
import {MusicPlayerStateMachine} from "./music-player-state-machine";

function normalize(stringArray: string[]): string[]
{
    return stringArray.filter((value, index, array) => array.indexOf(value) === index).sort();
}

test("resetting state works correctly", () =>
{
    // Act & Assert
    MusicPlayerStateMachine.resetState();
    expect(MusicPlayerStateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(false);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.None);

    // Act & Assert
    const indexedTracklist = {"test-song": {songName: "Test Song", secSongDuration: 98}};
    MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}, isShuffleEnabled: true, repeatMode: RepeatMode.All});
    expect(MusicPlayerStateMachine.getState().indexedTracklist).toStrictEqual(indexedTracklist);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(true);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.All);
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
    MusicPlayerStateMachine.resetState({indexedTracklist: {"test-song": {songName: "Test Song", secSongDuration: 98}}});
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.All);
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    MusicPlayerStateMachine.playSongNamed("Test Song");
    MusicPlayerStateMachine.setPlaybackProgress(30);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["test-song"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Act
    MusicPlayerStateMachine.setIndexedTracklist({...indexedTracklist});

    // Assert
    expect(MusicPlayerStateMachine.getState().indexedTracklist).toStrictEqual(indexedTracklist);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.All);
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(true);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
});

test("turning shuffle on and off works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState();

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(true);

    [undefined, null, false].forEach(isShuffleEnabled =>
    {
        // Arrange
        MusicPlayerStateMachine.resetState();

        // Act & Assert
        MusicPlayerStateMachine.setIsShuffleEnabled(isShuffleEnabled);
        expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(false);
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
    MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
    MusicPlayerStateMachine.playSongNamed("Song 1");
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(3);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);


    // Arrange: Playback is paused
    MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.setIsPlaying(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(3);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);
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
    MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    MusicPlayerStateMachine.playSongNamed("Song 1");
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(3);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);


    // Arrange: Playback is paused
    MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.setIsPlaying(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(3);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
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
    MusicPlayerStateMachine.resetState();

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(false);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);


    // Arrange: Only play queue is empty
    MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(false);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);


    // Arrange: All songs have finished playing
    MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
    MusicPlayerStateMachine.playSongNamed("Song 3");
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(false);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3"]);


    // Arrange
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.All);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(false);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3"]);
});

test("setting repeat mode works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState();

    // Act & Assert
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.All);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.All);

    [undefined, null, RepeatMode.None].forEach(repeatMode =>
    {
        // Arrange
        MusicPlayerStateMachine.resetState();

        // Act & Assert
        MusicPlayerStateMachine.setRepeatMode(repeatMode);
        expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.None);
    });
});

test("pausing and resuming playback works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 1");
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsPlaying(false);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsPlaying(true);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
});

test("resuming playback plays first song in the playlist when shuffle is off and there is no song selected for playing", () =>
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
        MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateMachine.setRepeatMode(repeatMode);

        // Act & Assert
        MusicPlayerStateMachine.setIsPlaying(true);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    });


    // Arrange
    MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
    MusicPlayerStateMachine.playSongNamed("Song 3");
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert
    MusicPlayerStateMachine.setIsPlaying(true);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3", "song-1"]);
});

test("resuming playback plays a random song in the playlist when shuffle is on and there is no song selected for playing", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149}
    };

    const tryCount = 50;
    let playedSongUriFromPreviousTest: string = undefined;
    [RepeatMode.None, RepeatMode.All].forEach(repeatMode =>
    {
        for (let i = 1; i <= tryCount; i++)
        {
            // Arrange
            MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
            MusicPlayerStateMachine.setIsShuffleEnabled(true);
            MusicPlayerStateMachine.setRepeatMode(repeatMode);

            // Act & Assert
            MusicPlayerStateMachine.setIsPlaying(true);
            expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
            expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
            expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3"]);

            const state = MusicPlayerStateMachine.getState();
            const playingSongUri = state.playQueue[state.playingSongIndex];
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
        MusicPlayerStateMachine.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateMachine.setIsShuffleEnabled(true);
        MusicPlayerStateMachine.playSongNamed("Song 1");
        MusicPlayerStateMachine.playNext();
        MusicPlayerStateMachine.playNext();
        MusicPlayerStateMachine.playNext();
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
        expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3"]);

        // Act
        MusicPlayerStateMachine.setIsPlaying(true);

        // Assert
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
        if (MusicPlayerStateMachine.getState().playingSongIndex === 2)
        {
            expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3"]);
        }
        else
        {
            expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(3);
            expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual([
                "song-1", "song-1", "song-2", "song-2", "song-3", "song-3"
            ]);
        }

        const state = MusicPlayerStateMachine.getState();
        const playingSongUri = state.playQueue[state.playingSongIndex];
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

test("playing a specific song when shuffle is off works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Act
    MusicPlayerStateMachine.playSongNamed("Song 2");

    // Assert: State is correct
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-2"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(4);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating forward sequentially to last song in the playlist works correctly
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-2", "song-3"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(5);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(6);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Act
    MusicPlayerStateMachine.playSongNamed("Song 3");

    // Assert: State is correct
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(7);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating backward sequentially to first song in the playlist works correctly
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3", "song-2"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(8);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(9);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
});

test("playing a specific song when shuffle is on works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.setIsShuffleEnabled(true);

    // Act & Assert
    MusicPlayerStateMachine.playSongNamed("Song 1");
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateMachine.playSongNamed("Song 3");
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);

    // Act
    MusicPlayerStateMachine.playSongNamed("Song 4");

    // Assert: State is correct
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 2)).toStrictEqual(["song-1", "song-3"]);
    expect(MusicPlayerStateMachine.getState().playQueue[2]).toBe("song-4");
    expect(MusicPlayerStateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3"]);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(6);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Assert: Navigating backward works correctly
    MusicPlayerStateMachine.playPrevious();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);

    // Assert: Navigating forward works correctly
    MusicPlayerStateMachine.playNext();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(4);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(5);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(normalize(MusicPlayerStateMachine.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
});

test("setting playback progress works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({indexedTracklist: {"song-1": {songName: "Song 1", secSongDuration: 74}}});

    // Act & Assert
    MusicPlayerStateMachine.setPlaybackProgress(24);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    MusicPlayerStateMachine.playSongNamed("Song 1");

    [0, 15, 30, 45, 60].forEach(secPlaybackProgress =>
    {
        // Arrange
        MusicPlayerStateMachine.setIsPlaying(true);
        MusicPlayerStateMachine.setPlaybackProgress(70);

        // Act & Assert
        MusicPlayerStateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(secPlaybackProgress);


        // Arrange
        MusicPlayerStateMachine.setIsPlaying(false);
        MusicPlayerStateMachine.setPlaybackProgress(70);

        // Act & Assert
        MusicPlayerStateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(secPlaybackProgress);
    });

    [undefined, NaN, -Infinity, -1].forEach(secPlaybackProgress =>
    {
        // Arrange
        MusicPlayerStateMachine.setIsPlaying(true);
        MusicPlayerStateMachine.setPlaybackProgress(25);

        // Act & Assert
        MusicPlayerStateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(0);


        // Arrange
        MusicPlayerStateMachine.setIsPlaying(false);
        MusicPlayerStateMachine.setPlaybackProgress(25);

        // Act & Assert
        MusicPlayerStateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(0);
    });

    [100, Infinity].forEach(secPlaybackProgress =>
    {
        // Arrange
        MusicPlayerStateMachine.setIsPlaying(true);
        MusicPlayerStateMachine.setPlaybackProgress(25);

        // Act & Assert
        MusicPlayerStateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(74);


        // Arrange
        MusicPlayerStateMachine.setIsPlaying(false);
        MusicPlayerStateMachine.setPlaybackProgress(25);

        // Act & Assert
        MusicPlayerStateMachine.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(74);
    });


    // Arrange
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);

    // Act & Assert
    MusicPlayerStateMachine.setPlaybackProgress(32);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
});

test("playback progress is set to 'undefined' every time a new song is selected for playing", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.setPlaybackProgress(30);

    // Act & Assert
    MusicPlayerStateMachine.playSongNamed("Song 2");
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    MusicPlayerStateMachine.setPlaybackProgress(45);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    MusicPlayerStateMachine.setPlaybackProgress(60);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
});

test("navigating through playlist when shuffle is off and repeat mode is 'None' works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });


    // Act & Assert: Navigating forward sequentially from first to last song in the playlist
    MusicPlayerStateMachine.playSongNamed("Song 1");
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward when last song in the playlist is being played stops playback
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after last song in the playlist finished playing
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateMachine.playNext();
        expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward sequentially from last to first song in the playlist
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(4);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(5);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(6);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2", "song-1"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(7);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward when first song in the playlist is selected for playing pauses and resets playback progress
    MusicPlayerStateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateMachine.playPrevious();
        expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2", "song-1"
        ]);
        expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(7);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when shuffle is off and repeat mode is 'All' works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.All);


    // Act & Assert: Navigating forward jumps back to first song after last song in the playlist finished playing
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(7);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: navigating backward sequentially to first song in the playlist
    MusicPlayerStateMachine.playPrevious();
    MusicPlayerStateMachine.playPrevious();
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1"
    ]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(10);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward when first song in the playlist is selected for playing pauses and resets playback progress
    MusicPlayerStateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateMachine.playPrevious();
        expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1"
        ]);
        expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(10);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when shuffle is off and playlist is being updated works correctly", () =>
{
    // Arrange: Playing "Song 3" then excluding "Song 4" then playing next to reach the end of playlist
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 3");
    MusicPlayerStateMachine.setSongExclusionStatus("Song 4", true);
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act: Re-including "Song 4" at the end of playlist then playing next
    MusicPlayerStateMachine.setSongExclusionStatus("Song 4", false);
    MusicPlayerStateMachine.playNext();

    // Assert: Nothing happens as end of playlist is reached
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert: Going back to "Song 4" instead of "Song 3" as "Song 4" is the new last song of playlist
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-3", "song-4"]);
});

test("navigating through playlist when shuffle is off skips excluded songs", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 2");
    MusicPlayerStateMachine.setSongExclusionStatus("Song 3", true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-2"]);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-2", "song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);


    // Arrange
    MusicPlayerStateMachine.setPlaybackProgress(30);
    MusicPlayerStateMachine.setSongExclusionStatus("Song 1", true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);


    // Arrange
    MusicPlayerStateMachine.setIsPlaying(true);
    MusicPlayerStateMachine.setPlaybackProgress(45);
    MusicPlayerStateMachine.setSongExclusionStatus("Song 4", true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
});

test("navigating through playlist when shuffle is on and repeat mode is 'None' works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.setIsShuffleEnabled(true);


    // Act & Assert: Playing a song refreshes upcoming songs
    MusicPlayerStateMachine.playSongNamed("Song 2");
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward only increases playing song index
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward when the last song is being played stops playback
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after the last song finished playing
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateMachine.playNext();
        expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward only decreases playing song index
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        // Act
        MusicPlayerStateMachine.playPrevious();

        // Assert: Navigating backward when the first song is selected for playing pauses and resets playback progress
        expect(MusicPlayerStateMachine.getState().playQueue.slice().sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when shuffle is on and repeat mode is 'All' works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.All);


    // Act & Assert: Navigating forward queues up new songs after all upcoming songs finished playing
    MusicPlayerStateMachine.playSongNamed("Song 3");
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(7);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(4);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward only decreases playing song index
    MusicPlayerStateMachine.playPrevious();
    MusicPlayerStateMachine.playPrevious();
    MusicPlayerStateMachine.playPrevious();
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(7);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateMachine.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        // Act
        MusicPlayerStateMachine.playPrevious();

        // Assert: Navigating backward when the first song is selected for playing pauses and resets playback progress
        expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(7);
        expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
        expect(MusicPlayerStateMachine.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
        expect(MusicPlayerStateMachine.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    }
});

test("navigating through playback history when shuffle is on skips excluded songs", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.playSongNamed("Song 2");
    MusicPlayerStateMachine.playSongNamed("Song 3");
    MusicPlayerStateMachine.playSongNamed("Song 4");
    MusicPlayerStateMachine.setSongExclusionStatus("Song 1", true);
    MusicPlayerStateMachine.setSongExclusionStatus("Song 3", true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);


    // Arrange
    MusicPlayerStateMachine.setPlaybackProgress(30);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
});

test("navigating away from the end of playlist does nothing if all songs are excluded", () =>
{
    // Arrange: Shuffle is off, Repeat Mode is 'None'
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 4");
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.setSongExclusionStatus("Song 1", true);
    MusicPlayerStateMachine.setSongExclusionStatus("Song 2", true);
    MusicPlayerStateMachine.setSongExclusionStatus("Song 3", true);
    MusicPlayerStateMachine.setSongExclusionStatus("Song 4", true);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is off, Repeat Mode is 'All'
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.All);
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is on, Repeat Mode is 'All'
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.All);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is on, Repeat Mode is 'None'
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.None);
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(true);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-4"]);
});

test("altering playlist marks songs as included or excluded", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });

    // Act
    MusicPlayerStateMachine.setSongExclusionStatus("Song 1", true);
    MusicPlayerStateMachine.setSongExclusionStatus("Song 3", true);

    // Assert
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(true);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBeFalsy();
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-4"].isExcludedFromActivePlaylist).toBeFalsy();


    // Act & Assert
    MusicPlayerStateMachine.setSongExclusionStatus("Song 1", false);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(false);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBeFalsy();
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-4"].isExcludedFromActivePlaylist).toBeFalsy();
});

test("altering playlist doesn't interrupt playback even if the playing song is excluded midway", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.setPlaybackProgress(30);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Excluding a song
    MusicPlayerStateMachine.setSongExclusionStatus("Song 3", true);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Including a song
    MusicPlayerStateMachine.setSongExclusionStatus("Song 3", false);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(false);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Act & Assert: Current playing song continues to play even if it is being excluded
    MusicPlayerStateMachine.setSongExclusionStatus("Song 1", true);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(true);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
});

test("altering playlist doesn't change play queue when shuffle is off", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playNext();
    MusicPlayerStateMachine.playPrevious();
    MusicPlayerStateMachine.playPrevious();
    MusicPlayerStateMachine.setPlaybackProgress(30);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-3", "song-2"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(5);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);

    // Act & Assert
    MusicPlayerStateMachine.setSongExclusionStatus("Song 3", true);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-3", "song-2"]);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(5);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);
});

test("altering playlist refreshes upcoming songs when shuffle is on", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(4);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3", "song-4"]);

    // Act: Excluding playing song
    const state = MusicPlayerStateMachine.getState();
    const playingSongUri = state.playQueue[state.playingSongIndex];
    const playingSongName = state.indexedTracklist[playingSongUri].songName;
    MusicPlayerStateMachine.setSongExclusionStatus(playingSongName, true);

    // Assert
    expect(playingSongUri).toBeDefined();
    expect(playingSongName).toBeDefined();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);


    // Arrange
    MusicPlayerStateMachine.setSongExclusionStatus(playingSongName, false);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act: Excluding non-playing song
    const nonPlayingSongUri = playingSongUri !== "song-3" ? "song-3" : "song-4";
    const nonPlayingSongName = state.indexedTracklist[nonPlayingSongUri].songName;
    const nonExcludedSongUri = nonPlayingSongUri !== "song-3" ? "song-3" : "song-4";
    MusicPlayerStateMachine.setSongExclusionStatus(nonPlayingSongName, true);

    // Assert
    expect(nonPlayingSongUri).toBeDefined();
    expect(nonPlayingSongName).toBeDefined();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(4);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", nonExcludedSongUri]);
    expect(MusicPlayerStateMachine.getState().indexedTracklist[nonPlayingSongUri].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song and navigating away when shuffle is off works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 2");
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-2"]);

    // Act
    MusicPlayerStateMachine.setSongExclusionStatus("Song 2", true);
    MusicPlayerStateMachine.playNext();

    // Assert
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-2", "song-3"]);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBe(true);


    // Act
    MusicPlayerStateMachine.setSongExclusionStatus("Song 3", true);
    MusicPlayerStateMachine.playPrevious();

    // Assert
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-2", "song-3", "song-1"]);
    expect(MusicPlayerStateMachine.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song and navigating forward when shuffle is on works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    MusicPlayerStateMachine.playSongNamed("Song 2");
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(4);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);

    // Act
    const state = MusicPlayerStateMachine.getState();
    const playingSongUri = state.playQueue[state.playingSongIndex];
    const playingSongName = state.indexedTracklist[playingSongUri].songName;
    MusicPlayerStateMachine.setSongExclusionStatus(playingSongName, true);
    MusicPlayerStateMachine.playNext();

    // Assert
    expect(playingSongUri).toBeDefined();
    expect(playingSongName).toBeDefined();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song and navigating backward when shuffle is on works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    MusicPlayerStateMachine.playSongNamed("Song 2");
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(4);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);

    // Act
    const state = MusicPlayerStateMachine.getState();
    const playingSongUri = state.playQueue[state.playingSongIndex];
    const playingSongName = state.indexedTracklist[playingSongUri].songName;
    MusicPlayerStateMachine.setSongExclusionStatus(playingSongName, true);
    MusicPlayerStateMachine.playPrevious();

    // Assert
    expect(playingSongUri).toBeDefined();
    expect(playingSongName).toBeDefined();
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);
});

test("invoking actions when playback is paused works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateMachine.playSongNamed("Song 1");
    MusicPlayerStateMachine.setPlaybackProgress(30);
    MusicPlayerStateMachine.setIsPlaying(false);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(true);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateMachine.getState().playQueue.length).toStrictEqual(4);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(false);
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(false);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.All);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.All);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.None);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.None);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateMachine.setIsPlaying(false);
    MusicPlayerStateMachine.setPlaybackProgress(45);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateMachine.setIsPlaying(false);
    MusicPlayerStateMachine.setPlaybackProgress(60);

    // Act & Assert
    MusicPlayerStateMachine.setIsPlaying(true);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(60);
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBe(2);


    // Arrange
    MusicPlayerStateMachine.setIsPlaying(false);

    // Act & Assert
    MusicPlayerStateMachine.setPlaybackProgress(65);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBe(65);
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);
});

test("invoking actions when tracklist is empty works correctly", () =>
{
    // Arrange
    MusicPlayerStateMachine.resetState();

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(true);
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(true);

    // Act & Assert
    MusicPlayerStateMachine.setIsShuffleEnabled(false);
    expect(MusicPlayerStateMachine.getState().isShuffleEnabled).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.All);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.All);

    // Act & Assert
    MusicPlayerStateMachine.setRepeatMode(RepeatMode.None);
    expect(MusicPlayerStateMachine.getState().repeatMode).toBe(RepeatMode.None);

    // Act & Assert
    MusicPlayerStateMachine.playNext();
    expect(MusicPlayerStateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.playPrevious();
    expect(MusicPlayerStateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.setIsPlaying(true);
    expect(MusicPlayerStateMachine.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateMachine.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateMachine.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateMachine.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateMachine.setPlaybackProgress(30);
    expect(MusicPlayerStateMachine.getState().secPlaybackProgress).toBeUndefined();
});
