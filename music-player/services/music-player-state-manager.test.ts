import {RepeatMode} from "../enums";
import {MusicPlayerStateManager} from "./music-player-state-manager";

function normalize(stringArray: string[]): string[]
{
    return stringArray.filter((value, index, array) => array.indexOf(value) === index).sort();
}

describe("how to use [setIsShuffleEnabled(...)]", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149}
    };

    it("turns shuffle on and off", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState();

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(false);
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(false);
    });

    it.each([
        {target: undefined, expected: false},
        {target: null, expected: false}
    ])("treats '$target' as '$expected'", ({target, expected}) =>
    {
        // Arrange
        MusicPlayerStateManager.resetState();

        // Act
        MusicPlayerStateManager.setIsShuffleEnabled(target);

        // Assert
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(expected);
    });

    it("doesn't queue up new songs if there is no song selected for playing", () =>
    {
        // Arrange: Both tracklist and play queue are empty
        MusicPlayerStateManager.resetState();

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(false);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);


        // Arrange: Only play queue is empty
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(false);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);


        // Arrange: All songs have finished playing
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 3");
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(false);
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(false);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);


        // Arrange
        MusicPlayerStateManager.setRepeatMode(RepeatMode.All);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);
    });

    it("queues up new songs if set to 'true' and there is a song selected for playing", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);


        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2"]);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 2)).toStrictEqual(["song-1", "song-2"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(2).sort()).toStrictEqual(["song-1", "song-3"]);


        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3"]);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 3)).toStrictEqual(["song-1", "song-2", "song-3"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2"]);


        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);

        // Act & Assert
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 3)).toStrictEqual(["song-1", "song-2", "song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(3).sort()).toStrictEqual(["song-2", "song-3"]);
    });

    it("clears upcoming songs if set to 'false' and there is a song selected for playing", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        MusicPlayerStateManager.playSongNamed("Song 1");
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


        // Act
        MusicPlayerStateManager.setIsShuffleEnabled(false);


        // Assert: State is correct
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(false);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Assert: Navigating forward works correctly
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

        // Assert: Navigating backward works correctly
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-3"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(3);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-3", "song-2"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(4);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-3", "song-2", "song-1"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(5);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.setPlaybackProgress(30);
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-3", "song-2", "song-1"]);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(5);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    });
});

describe("how to use [setRepeatMode(...)]", () =>
{
    it.each([
        {target: RepeatMode.None},
        {target: RepeatMode.All}
    ])("sets repeat mode to '$target'", ({target}) =>
    {
        // Arrange
        MusicPlayerStateManager.resetState();

        // Act
        MusicPlayerStateManager.setRepeatMode(target);

        // Assert
        expect(MusicPlayerStateManager.getState().repeatMode).toBe(target);
    });

    it.each([
        {target: undefined, expected: RepeatMode.None},
        {target: null, expected: RepeatMode.None}
    ])("treats '$target' as '$expected'", ({target, expected}) =>
    {
        // Arrange
        MusicPlayerStateManager.resetState();

        // Act
        MusicPlayerStateManager.setRepeatMode(target);

        // Assert
        expect(MusicPlayerStateManager.getState().repeatMode).toBe(expected);
    });
});

describe("how to use [setIsPlaying(...)]", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149},
        "song-4": {songName: "Song 4", secSongDuration: 264}
    };

    it("plays first song in the playlist if set to 'true' and there is no song selected for playing", () =>
    {
        // Arrange: Shuffle is off
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});

        // Act & Assert
        MusicPlayerStateManager.setIsPlaying(true);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);


        // Arrange: Shuffle is on
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.setIsShuffleEnabled(true);

        // Act & Assert: Also refreshes upcoming songs
        MusicPlayerStateManager.setIsPlaying(true);
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue.length).toBe(4);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    });

    it("pauses and resumes playback", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);

        // Act & Assert
        MusicPlayerStateManager.setIsPlaying(false);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);

        // Act & Assert
        MusicPlayerStateManager.setIsPlaying(true);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
    });
});

describe("how to use [setPlaybackProgress(...)]", () =>
{
    it("sets current playback progress in seconds", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {"song-1": {songName: "Song 1", secSongDuration: 74}}});
        MusicPlayerStateManager.playSongNamed("Song 1");

        // Act & Assert
        MusicPlayerStateManager.setPlaybackProgress(0);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(0);

        // Act & Assert
        MusicPlayerStateManager.setPlaybackProgress(30);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
    });

    it.each([
        {var: "'undefined'", secPlaybackProgress: undefined},
        {var: "'NaN'", secPlaybackProgress: NaN},
        {var: "'-Infinity'", secPlaybackProgress: -Infinity},
        {var: "negative numbers", secPlaybackProgress: -1}
    ])("treats $var as '0' if there is a song selected for playing", ({secPlaybackProgress}) =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {"song-1": {songName: "Song 1", secSongDuration: 74}}});
        MusicPlayerStateManager.playSongNamed("Song 1");

        // Act & Assert
        MusicPlayerStateManager.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(0);


        // Arrange
        MusicPlayerStateManager.setIsPlaying(false);

        // Act & Assert
        MusicPlayerStateManager.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(0);
    });

    it.each([
        {secPlaybackProgress: Infinity}
    ])("treats '$secPlaybackProgress' as song duration if there is a song selected for playing", ({secPlaybackProgress}) =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {"song-1": {songName: "Song 1", secSongDuration: 74}}});
        MusicPlayerStateManager.playSongNamed("Song 1");

        // Act & Assert
        MusicPlayerStateManager.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(74);


        // Arrange
        MusicPlayerStateManager.setIsPlaying(false);

        // Act & Assert
        MusicPlayerStateManager.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(74);
    });

    it("sets playback progress to 'undefined' if no song is selected for playing", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {"song-1": {songName: "Song 1", secSongDuration: 74}}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);

        // Act
        MusicPlayerStateManager.setPlaybackProgress(30);

        // Assert
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
    });
});

describe("how to use [playSongNamed(...)]", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149},
        "song-4": {songName: "Song 4", secSongDuration: 264}
    };

    it("queues up the song being played if shuffle is off", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(3);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Act
        MusicPlayerStateManager.playSongNamed("Song 2");

        // Assert: State is correct
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-2"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(4);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Assert: Navigating forward sequentially to last song in the playlist works correctly
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-2", "song-3"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(5);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4"
        ]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(6);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


        // Act
        MusicPlayerStateManager.playSongNamed("Song 3");

        // Assert: State is correct
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3"
        ]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(7);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Assert: Navigating backward sequentially to first song in the playlist works correctly
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3", "song-2"
        ]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(8);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1"
        ]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(9);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    });

    it("queues up the song being played and refreshes upcoming songs if shuffle is on", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.setIsShuffleEnabled(true);

        // Act & Assert
        MusicPlayerStateManager.playSongNamed("Song 1");
        expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


        // Arrange
        MusicPlayerStateManager.playNext();
        const playbackHistorySnapshot = MusicPlayerStateManager.getState().playQueue.slice(0, 2);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);

        // Act
        MusicPlayerStateManager.playSongNamed("Song 4");

        // Assert: State is correct
        expect(MusicPlayerStateManager.getState().playQueue[2]).toBe("song-4");
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 2)).toStrictEqual(playbackHistorySnapshot);
        expect(MusicPlayerStateManager.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3"]);
        expect(MusicPlayerStateManager.getState().playQueue.length).toBe(6);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Assert: Navigating backward works correctly
        MusicPlayerStateManager.playPrevious();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playPrevious();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playPrevious();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

        // Assert: Navigating forward works correctly
        MusicPlayerStateManager.playNext();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playNext();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playNext();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(3);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playNext();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(4);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playNext();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(5);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        MusicPlayerStateManager.playNext();
        expect(normalize(MusicPlayerStateManager.getState().playQueue)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    });
});

describe("how to use [setSongExclusionStatus(...)]", () =>
{
    it("marks the songs as included or excluded", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({
            indexedTracklist: {
                "song-1": {songName: "Song 1", secSongDuration: 74},
                "song-2": {songName: "Song 2", secSongDuration: 86},
                "song-3": {songName: "Song 3", secSongDuration: 149},
                "song-4": {songName: "Song 4", secSongDuration: 264}
            }
        });

        // Act
        MusicPlayerStateManager.setSongExclusionStatus("Song 1", true);
        MusicPlayerStateManager.setSongExclusionStatus("Song 3", true);

        // Assert
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBeFalsy();
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-4"].isExcludedFromActivePlaylist).toBeFalsy();


        // Act & Assert
        MusicPlayerStateManager.setSongExclusionStatus("Song 1", false);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(false);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBeFalsy();
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-4"].isExcludedFromActivePlaylist).toBeFalsy();
    });

    it("doesn't interrupt playback even if the playing song is excluded midway", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({
            indexedTracklist: {
                "song-1": {songName: "Song 1", secSongDuration: 74},
                "song-2": {songName: "Song 2", secSongDuration: 86},
                "song-3": {songName: "Song 3", secSongDuration: 149},
                "song-4": {songName: "Song 4", secSongDuration: 264}
            }
        });
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.setPlaybackProgress(30);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Act & Assert: Excluding a song
        MusicPlayerStateManager.setSongExclusionStatus("Song 3", true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Act & Assert: Including a song
        MusicPlayerStateManager.setSongExclusionStatus("Song 3", false);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(false);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Act & Assert: Current playing song continues to play even if it is being excluded
        MusicPlayerStateManager.setSongExclusionStatus("Song 1", true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    });

    it("doesn't alter play queue if shuffle is off", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({
            indexedTracklist: {
                "song-1": {songName: "Song 1", secSongDuration: 74},
                "song-2": {songName: "Song 2", secSongDuration: 86},
                "song-3": {songName: "Song 3", secSongDuration: 149},
                "song-4": {songName: "Song 4", secSongDuration: 264}
            }
        });
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playPrevious();
        MusicPlayerStateManager.playPrevious();
        MusicPlayerStateManager.setPlaybackProgress(30);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-3", "song-2"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(5);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

        // Act & Assert
        MusicPlayerStateManager.setSongExclusionStatus("Song 3", true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-3", "song-2"]);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(5);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    });

    it("refreshes upcoming songs if shuffle is on", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({
            indexedTracklist: {
                "song-1": {songName: "Song 1", secSongDuration: 74},
                "song-2": {songName: "Song 2", secSongDuration: 86},
                "song-3": {songName: "Song 3", secSongDuration: 149},
                "song-4": {songName: "Song 4", secSongDuration: 264}
            }
        });
        MusicPlayerStateManager.setIsShuffleEnabled(true);
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
        expect(MusicPlayerStateManager.getState().playQueue.length).toBe(4);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3", "song-4"]);

        // Act: Excluding playing song
        const state = MusicPlayerStateManager.getState();
        const playingSongUri = state.playQueue[state.playingSongIndex];
        const playingSongName = state.indexedTracklist[playingSongUri].songName;
        MusicPlayerStateManager.setSongExclusionStatus(playingSongName, true);

        // Assert
        expect(playingSongUri).toBeDefined();
        expect(playingSongName).toBeDefined();
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
        expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);


        // Arrange
        MusicPlayerStateManager.setSongExclusionStatus(playingSongName, false);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
        expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

        // Act: Excluding non-playing song
        const nonPlayingSongUri = playingSongUri !== "song-3" ? "song-3" : "song-4";
        const nonPlayingSongName = state.indexedTracklist[nonPlayingSongUri].songName;
        const nonExcludedSongUri = nonPlayingSongUri !== "song-3" ? "song-3" : "song-4";
        MusicPlayerStateManager.setSongExclusionStatus(nonPlayingSongName, true);

        // Assert
        expect(nonPlayingSongUri).toBeDefined();
        expect(nonPlayingSongName).toBeDefined();
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
        expect(MusicPlayerStateManager.getState().playQueue.length).toBe(4);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", nonExcludedSongUri]);
        expect(MusicPlayerStateManager.getState().indexedTracklist[nonPlayingSongUri].isExcludedFromActivePlaylist).toBe(true);
    });
});

test("navigating through playlist when shuffle is off and repeat mode is 'None' works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });


    // Act & Assert: Navigating forward sequentially from first to last song in the playlist
    MusicPlayerStateManager.playSongNamed("Song 1");
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward when last song in the playlist is being played stops playback
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after last song in the playlist finished playing
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward sequentially from last to first song in the playlist
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(4);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3"
    ]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(5);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2"
    ]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(6);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2", "song-1"
    ]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(7);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward when first song in the playlist is selected for playing pauses and resets playback progress
    MusicPlayerStateManager.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-4", "song-3", "song-2", "song-1"
        ]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(7);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when shuffle is off and repeat mode is 'All' works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.setRepeatMode(RepeatMode.All);


    // Act & Assert: Navigating forward jumps back to first song after last song in the playlist finished playing
    MusicPlayerStateManager.playSongNamed("Song 1");
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4"
    ]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(7);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Act & Assert: navigating backward sequentially to first song in the playlist
    MusicPlayerStateManager.playPrevious();
    MusicPlayerStateManager.playPrevious();
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1"
    ]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(10);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward when first song in the playlist is selected for playing pauses and resets playback progress
    MusicPlayerStateManager.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
            "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1"
        ]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(10);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when shuffle is off and playlist is being updated works correctly", () =>
{
    // Arrange: Playing "Song 3" then excluding "Song 4" then playing next to reach the end of playlist
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.playSongNamed("Song 3");
    MusicPlayerStateManager.setSongExclusionStatus("Song 4", true);
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);

    // Act: Re-including "Song 4" at the end of playlist then playing next
    MusicPlayerStateManager.setSongExclusionStatus("Song 4", false);
    MusicPlayerStateManager.playNext();

    // Assert: Nothing happens as end of playlist is reached
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);

    // Act & Assert: Going back to "Song 4" instead of "Song 3" as "Song 4" is the new last song of playlist
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3", "song-4"]);
});

test("navigating through playlist when shuffle is on and repeat mode is 'None' works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.setIsShuffleEnabled(true);


    // Act & Assert: Playing a song refreshes upcoming songs
    MusicPlayerStateManager.playSongNamed("Song 2");
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward only increases playing song index
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating forward when the last song is being played stops playback
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after the last song finished playing
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward only decreases playing song index
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateManager.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        // Act
        MusicPlayerStateManager.playPrevious();

        // Assert: Navigating backward when the first song is selected for playing pauses and resets playback progress
        expect(MusicPlayerStateManager.getState().playQueue.sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist when shuffle is on and repeat mode is 'All' works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.setIsShuffleEnabled(true);
    MusicPlayerStateManager.setRepeatMode(RepeatMode.All);


    // Act & Assert: Navigating forward queues up new songs after all upcoming songs finished playing
    MusicPlayerStateManager.playSongNamed("Song 3");
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(7);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(4);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward only decreases playing song index
    MusicPlayerStateManager.playPrevious();
    MusicPlayerStateManager.playPrevious();
    MusicPlayerStateManager.playPrevious();
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(7);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateManager.setPlaybackProgress(30);
    for (let i = 0; i < 5; i++)
    {
        // Act
        MusicPlayerStateManager.playPrevious();

        // Assert: Navigating backward when the first song is selected for playing pauses and resets playback progress
        expect(MusicPlayerStateManager.getState().playQueue.length).toBe(7);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-3"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1, 4).sort()).toStrictEqual(["song-1", "song-2", "song-4"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    }
});

test("navigating through playlist skips excluded songs when shuffle is off", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.playSongNamed("Song 2");
    MusicPlayerStateManager.setSongExclusionStatus("Song 3", true);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-2"]);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-2", "song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);


    // Arrange
    MusicPlayerStateManager.setPlaybackProgress(30);
    MusicPlayerStateManager.setSongExclusionStatus("Song 1", true);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);


    // Arrange
    MusicPlayerStateManager.setIsPlaying(true);
    MusicPlayerStateManager.setPlaybackProgress(45);
    MusicPlayerStateManager.setSongExclusionStatus("Song 4", true);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-2", "song-4", "song-2"]);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
});

test("navigating through playback history skips excluded songs when shuffle is on", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.setIsShuffleEnabled(true);
    MusicPlayerStateManager.playSongNamed("Song 1");
    MusicPlayerStateManager.playSongNamed("Song 2");
    MusicPlayerStateManager.playSongNamed("Song 3");
    MusicPlayerStateManager.playSongNamed("Song 4");
    MusicPlayerStateManager.setSongExclusionStatus("Song 1", true);
    MusicPlayerStateManager.setSongExclusionStatus("Song 3", true);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);


    // Arrange
    MusicPlayerStateManager.setPlaybackProgress(30);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(3);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 4)).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
});

test("navigating away from the end of playlist does nothing if all songs are excluded", () =>
{
    // Arrange: Shuffle is off, Repeat Mode is 'None'
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.playSongNamed("Song 4");
    MusicPlayerStateManager.playNext();
    MusicPlayerStateManager.setSongExclusionStatus("Song 1", true);
    MusicPlayerStateManager.setSongExclusionStatus("Song 2", true);
    MusicPlayerStateManager.setSongExclusionStatus("Song 3", true);
    MusicPlayerStateManager.setSongExclusionStatus("Song 4", true);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is off, Repeat Mode is 'All'
    MusicPlayerStateManager.setRepeatMode(RepeatMode.All);
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is on, Repeat Mode is 'All'
    MusicPlayerStateManager.setIsShuffleEnabled(true);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);


    // Arrange: Shuffle is on, Repeat Mode is 'None'
    MusicPlayerStateManager.setRepeatMode(RepeatMode.None);
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-4"]);
});

test("excluding playing song and navigating away when shuffle is off works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.playSongNamed("Song 2");
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-2"]);

    // Act
    MusicPlayerStateManager.setSongExclusionStatus("Song 2", true);
    MusicPlayerStateManager.playNext();

    // Assert
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-2", "song-3"]);
    expect(MusicPlayerStateManager.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBe(true);


    // Act
    MusicPlayerStateManager.setSongExclusionStatus("Song 3", true);
    MusicPlayerStateManager.playPrevious();

    // Assert
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-2", "song-3", "song-1"]);
    expect(MusicPlayerStateManager.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song and navigating forward when shuffle is on works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.setIsShuffleEnabled(true);
    MusicPlayerStateManager.playSongNamed("Song 2");
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(4);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);

    // Act
    const state = MusicPlayerStateManager.getState();
    const playingSongUri = state.playQueue[state.playingSongIndex];
    const playingSongName = state.indexedTracklist[playingSongUri].songName;
    MusicPlayerStateManager.setSongExclusionStatus(playingSongName, true);
    MusicPlayerStateManager.playNext();

    // Assert
    expect(playingSongUri).toBeDefined();
    expect(playingSongName).toBeDefined();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);
});

test("excluding playing song and navigating backward when shuffle is on works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.setIsShuffleEnabled(true);
    MusicPlayerStateManager.playSongNamed("Song 2");
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(4);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-3", "song-4"]);

    // Act
    const state = MusicPlayerStateManager.getState();
    const playingSongUri = state.playQueue[state.playingSongIndex];
    const playingSongName = state.indexedTracklist[playingSongUri].songName;
    MusicPlayerStateManager.setSongExclusionStatus(playingSongName, true);
    MusicPlayerStateManager.playPrevious();

    // Assert
    expect(playingSongUri).toBeDefined();
    expect(playingSongName).toBeDefined();
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().playQueue.length).toBe(5);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-2"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().indexedTracklist[playingSongUri].isExcludedFromActivePlaylist).toBe(true);
});

test("playback progress is set to 'undefined' every time a new song is selected for playing", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.playSongNamed("Song 1");
    MusicPlayerStateManager.setPlaybackProgress(30);

    // Act & Assert
    MusicPlayerStateManager.playSongNamed("Song 2");
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    MusicPlayerStateManager.setPlaybackProgress(45);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();


    // Arrange
    MusicPlayerStateManager.setPlaybackProgress(60);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
});

test("invoking actions when playback is paused works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState({
        indexedTracklist: {
            "song-1": {songName: "Song 1", secSongDuration: 74},
            "song-2": {songName: "Song 2", secSongDuration: 86},
            "song-3": {songName: "Song 3", secSongDuration: 149},
            "song-4": {songName: "Song 4", secSongDuration: 264}
        }
    });
    MusicPlayerStateManager.playSongNamed("Song 1");
    MusicPlayerStateManager.setPlaybackProgress(30);
    MusicPlayerStateManager.setIsPlaying(false);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);

    // Act & Assert
    MusicPlayerStateManager.setIsShuffleEnabled(true);
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateManager.getState().playQueue.length).toStrictEqual(4);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.setIsShuffleEnabled(false);
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(false);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.setRepeatMode(RepeatMode.All);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.setRepeatMode(RepeatMode.None);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.None);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(1);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateManager.setIsPlaying(false);
    MusicPlayerStateManager.setPlaybackProgress(45);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateManager.setIsPlaying(false);
    MusicPlayerStateManager.setPlaybackProgress(60);

    // Act & Assert
    MusicPlayerStateManager.setIsPlaying(true);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(60);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);


    // Arrange
    MusicPlayerStateManager.setIsPlaying(false);

    // Act & Assert
    MusicPlayerStateManager.setPlaybackProgress(75);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(75);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
});

test("invoking actions when tracklist is empty works correctly", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState();

    // Act & Assert
    MusicPlayerStateManager.setIsShuffleEnabled(true);
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);

    // Act & Assert
    MusicPlayerStateManager.setIsShuffleEnabled(false);
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.setRepeatMode(RepeatMode.All);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);

    // Act & Assert
    MusicPlayerStateManager.setRepeatMode(RepeatMode.None);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.None);

    // Act & Assert
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.setIsPlaying(true);
    expect(MusicPlayerStateManager.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.setPlaybackProgress(30);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
});

test("resetting state to default works correctly", () =>
{
    // Act & Assert
    MusicPlayerStateManager.resetState();
    expect(MusicPlayerStateManager.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(false);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.None);
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
    MusicPlayerStateManager.resetState({indexedTracklist: {"test-song": {songName: "Test Song", secSongDuration: 98}}});
    MusicPlayerStateManager.setIsShuffleEnabled(true);
    MusicPlayerStateManager.setRepeatMode(RepeatMode.All);
    MusicPlayerStateManager.playSongNamed("Test Song");
    MusicPlayerStateManager.setPlaybackProgress(30);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["test-song"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);

    // Act
    MusicPlayerStateManager.setIndexedTracklist({...indexedTracklist});

    // Assert: Part of the state get reset
    expect(MusicPlayerStateManager.getState().indexedTracklist).toStrictEqual(indexedTracklist);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();

    // Assert: Shuffle and repeat mode remain unchanged
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);
});
