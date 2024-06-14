import {RepeatMode} from "../enums";
import {MusicPlayerStateManager} from "./music-player-state-manager";

function normalize(stringArray: string[]): string[]
{
    return stringArray.filter((value, index, array) => array.indexOf(value) === index).sort();
}

describe("setting repeat mode", () =>
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

describe("toggling shuffle", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149}
    };

    it.each([
        {target: undefined, expected: true},
        {target: null, expected: true},
        {target: false, expected: true},
        {target: true, expected: false}
    ])("changes value from '$target' to '$expected'", ({target, expected}) =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({isShuffleEnabled: target});

        // Act
        MusicPlayerStateManager.toggleShuffle();

        // Assert
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(expected);
    });

    it("doesn't queue up new songs if there is no song selected for playing", () =>
    {
        // Arrange: Both tracklist and play queue are empty
        MusicPlayerStateManager.resetState();

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);


        // Arrange: Only play queue is empty
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);


        // Arrange: All songs have finished playing
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 3");
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(false);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);


        // Arrange
        MusicPlayerStateManager.setRepeatMode(RepeatMode.All);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-3"]);
    });

    it("queues up new songs if toggled on and there is a song selected for playing", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);


        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2"]);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 2)).toStrictEqual(["song-1", "song-2"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(2).sort()).toStrictEqual(["song-1", "song-3"]);


        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3"]);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 3)).toStrictEqual(["song-1", "song-2", "song-3"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(3).sort()).toStrictEqual(["song-1", "song-2"]);


        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.playSongNamed("Song 1");
        MusicPlayerStateManager.playNext();
        MusicPlayerStateManager.playPrevious();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);

        // Act & Assert
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 3)).toStrictEqual(["song-1", "song-2", "song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(3).sort()).toStrictEqual(["song-2", "song-3"]);
    });

    it("clears upcoming songs if toggled off and there is a song selected for playing", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.toggleShuffle();
        MusicPlayerStateManager.playSongNamed("Song 1");
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
        expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
        expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


        // Act: Toggling shuffle off
        MusicPlayerStateManager.toggleShuffle();


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

describe("toggling playback status", () =>
{
    // Test Data
    const indexedTracklist = {
        "song-1": {songName: "Song 1", secSongDuration: 74},
        "song-2": {songName: "Song 2", secSongDuration: 86},
        "song-3": {songName: "Song 3", secSongDuration: 149},
        "song-4": {songName: "Song 4", secSongDuration: 264}
    };

    it("plays first song in the tracklist if toggled on and there is no song selected for playing", () =>
    {
        // Arrange: Shuffle is off
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});

        // Act & Assert
        MusicPlayerStateManager.togglePlaybackStatus();
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);


        // Arrange: Shuffle is on
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.toggleShuffle();

        // Act & Assert: Also refreshes upcoming songs
        MusicPlayerStateManager.togglePlaybackStatus();
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
        MusicPlayerStateManager.togglePlaybackStatus();
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);

        // Act & Assert
        MusicPlayerStateManager.togglePlaybackStatus();
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
    });
});

describe("playing a specific song", () =>
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

        // Assert: Navigating forward sequentially to last song in the tracklist
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

        // Assert: Navigating backward sequentially to first song in the tracklist
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

    it("refreshes upcoming songs if shuffle is on", () =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {...indexedTracklist}});
        MusicPlayerStateManager.toggleShuffle();
        expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);

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

describe("setting playback progress", () =>
{
    it.each([
        {target: 0},
        {target: 30}
    ])("sets playback progress to '$target' seconds", ({target}) =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {"song-1": {songName: "Song 1", secSongDuration: 74}}});
        MusicPlayerStateManager.playSongNamed("Song 1");

        // Act
        MusicPlayerStateManager.setPlaybackProgress(target);

        // Assert
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(target);
    });

    it.each([
        {secPlaybackProgress: undefined},
        {secPlaybackProgress: NaN},
        {secPlaybackProgress: -Infinity},
        {secPlaybackProgress: -1}
    ])("treats '$secPlaybackProgress' as '0' if there is a song selected for playing", ({secPlaybackProgress}) =>
    {
        // Arrange
        MusicPlayerStateManager.resetState({indexedTracklist: {"song-1": {songName: "Song 1", secSongDuration: 74}}});
        MusicPlayerStateManager.playSongNamed("Song 1");

        // Act & Assert
        MusicPlayerStateManager.setPlaybackProgress(secPlaybackProgress);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
        expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(0);


        // Arrange: Playback is paused
        MusicPlayerStateManager.togglePlaybackStatus();

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


        // Arrange: Playback is paused
        MusicPlayerStateManager.togglePlaybackStatus();

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

describe("adding and removing songs", () =>
{
    it("marks the songs as excluded or included", () =>
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
        MusicPlayerStateManager.toggleSongExclusionStatus("Song 1");
        MusicPlayerStateManager.toggleSongExclusionStatus("Song 3");

        // Assert
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBeFalsy();
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-4"].isExcludedFromActivePlaylist).toBeFalsy();


        // Act
        MusicPlayerStateManager.toggleSongExclusionStatus("Song 1");

        // Assert
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-1"].isExcludedFromActivePlaylist).toBeFalsy();
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-2"].isExcludedFromActivePlaylist).toBeFalsy();
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-3"].isExcludedFromActivePlaylist).toBe(true);
        expect(MusicPlayerStateManager.getState().indexedTracklist["song-4"].isExcludedFromActivePlaylist).toBeFalsy();
    });

    it("doesn't interrupt playback", () =>
    {

    });
});

test("navigating through playlist while shuffle is off and repeat mode is 'None'", () =>
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


    // Act & Assert: Navigating forward sequentially from first to last song in the tracklist
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


    // Act & Assert: Navigating forward when last song in the tracklist is being played stops playback
    MusicPlayerStateManager.playNext();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);


    // Act & Assert: Navigating forward does nothing after last song in the tracklist finished playing
    for (let i = 0; i < 5; i++)
    {
        MusicPlayerStateManager.playNext();
        expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-3", "song-4"]);
        expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(Infinity);
        expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
    }


    // Act & Assert: Navigating backward sequentially from last to first song in the tracklist
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


    // Act & Assert: Navigating backward when first song in the tracklist is selected for playing pauses and resets playback progress
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

test("navigating through playlist while shuffle is off and repeat mode is 'All'", () =>
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
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);


    // Act & Assert: Navigating forward jumps back to first song after last song in the tracklist finished playing
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


    // Act & Assert: navigating backward sequentially to first song in the tracklist
    MusicPlayerStateManager.playPrevious();
    MusicPlayerStateManager.playPrevious();
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([
        "song-1", "song-2", "song-3", "song-4", "song-1", "song-2", "song-3", "song-4", "song-3", "song-2", "song-1"
    ]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(10);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Act & Assert: Navigating backward when first song in the tracklist is selected for playing pauses and resets playback progress
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

test("navigating through playlist while shuffle is on and repeat mode is 'None'", () =>
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
    MusicPlayerStateManager.toggleShuffle();
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);


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

test("navigating through playlist while shuffle is on and repeat mode is 'All'", () =>
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
    MusicPlayerStateManager.toggleShuffle();
    MusicPlayerStateManager.setRepeatMode(RepeatMode.All);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);


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
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);

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

test("invoking actions when playback is paused", () =>
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
    MusicPlayerStateManager.togglePlaybackStatus();
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.toggleShuffle();
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateManager.getState().playQueue.length).toStrictEqual(4);
    expect(MusicPlayerStateManager.getState().playQueue.slice(0, 1)).toStrictEqual(["song-1"]);
    expect(MusicPlayerStateManager.getState().playQueue.slice(1).sort()).toStrictEqual(["song-2", "song-3", "song-4"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.toggleShuffle();
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
    MusicPlayerStateManager.togglePlaybackStatus();
    MusicPlayerStateManager.setPlaybackProgress(45);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(45);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.playPrevious();
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(undefined);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateManager.togglePlaybackStatus();
    MusicPlayerStateManager.setPlaybackProgress(60);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(60);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.togglePlaybackStatus();
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(60);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["song-1", "song-2", "song-1"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(2);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);


    // Arrange
    MusicPlayerStateManager.togglePlaybackStatus();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.setPlaybackProgress(75);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(75);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);
});

test("invoking actions when tracklist is empty", () =>
{
    // Arrange
    MusicPlayerStateManager.resetState();

    // Act & Assert
    MusicPlayerStateManager.toggleShuffle();
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);

    // Act & Assert
    MusicPlayerStateManager.toggleShuffle();
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
    MusicPlayerStateManager.togglePlaybackStatus();
    expect(MusicPlayerStateManager.getState().indexedTracklist).toStrictEqual({});
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual([]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBeUndefined();
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(false);

    // Act & Assert
    MusicPlayerStateManager.setPlaybackProgress(30);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBeUndefined();
});

test("indexing tracklist", () =>
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
    MusicPlayerStateManager.toggleShuffle();
    MusicPlayerStateManager.setRepeatMode(RepeatMode.All);
    MusicPlayerStateManager.playSongNamed("Test Song");
    MusicPlayerStateManager.setPlaybackProgress(30);
    expect(MusicPlayerStateManager.getState().playQueue).toStrictEqual(["test-song"]);
    expect(MusicPlayerStateManager.getState().playingSongIndex).toBe(0);
    expect(MusicPlayerStateManager.getState().isPlaying).toBe(true);
    expect(MusicPlayerStateManager.getState().secPlaybackProgress).toBe(30);
    expect(MusicPlayerStateManager.getState().isShuffleEnabled).toBe(true);
    expect(MusicPlayerStateManager.getState().repeatMode).toBe(RepeatMode.All);

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

// TODO: make playingSongIndex reaches Infinity then excludes all songs.
// TODO: Exclude the song being played, Exclude songs whiles paused
