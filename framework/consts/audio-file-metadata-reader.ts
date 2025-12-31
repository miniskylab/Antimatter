import {fromByteArray, toByteArray} from "base64-js";
import {type AudioPlayer, AudioStatus, createAudioPlayer} from "expo-audio";
import {File} from "expo-file-system";
import * as UTF8 from "utf8";
import {EMPTY_STRING} from "./typescript";

type AudioMetadata = { readonly TITLE: string; readonly ARTIST: string; };
export const AudioFileMetadataReader = new class
{
    private readonly ID3v2_METADATA_ID = "ID3";
    private readonly FLAC_METADATA_ID = "fLaC";
    private readonly MEMORY_BUFFER_SIZE_IN_BYTE = 256 * 1024;
    private readonly ID3v2_FRAME_ID: AudioMetadata = {TITLE: "TIT2", ARTIST: "TPE1"};
    private readonly AUDIO_METADATA_DESCRIPTION: AudioMetadata = {TITLE: "TITLE", ARTIST: "ARTIST"};
    private readonly AUDIO_METADATA_ENTRY_COUNT = Object.keys(this.AUDIO_METADATA_DESCRIPTION).length;

    private pathToAudioFile: string;
    private id3v2TagSizeInByte: number;
    private metadataId: string | undefined;
    private audioMetadata: Record<string, string>;
    private memoryBufferByteData: Uint8Array = Uint8Array.from([]);
    private isFinishedReadingAudioMetadata = false;
    private memoryBufferReadCursorPosition = 0;
    private audioFileReadCursorPosition = 0;

    private get isFinishedReadingMemoryBuffer() { return this.memoryBufferReadCursorPosition >= this.memoryBufferByteData.length; }

    private get isAllNecessaryMetadataAcquired() { return Object.keys(this.audioMetadata).length >= this.AUDIO_METADATA_ENTRY_COUNT; }

    async readAsync(pathToAudioFile: string)
    {
        this.reset();
        this.pathToAudioFile = pathToAudioFile;

        this.metadataId = this.getMetadataId();
        if (this.metadataId === this.ID3v2_METADATA_ID)
        {
            this.readID3v2Header();
            while (!this.isFinishedReadingAudioMetadata)
            {
                this.readID3v2Frame();
            }
        }
        else if (this.metadataId === this.FLAC_METADATA_ID)
        {
            while (!this.isFinishedReadingAudioMetadata)
            {
                this.readFLACMetadataBlock();
            }
        }

        return {
            secDuration: await this.getDurationAsync(),
            title: this.audioMetadata[this.AUDIO_METADATA_DESCRIPTION.TITLE],
            artist: this.audioMetadata[this.AUDIO_METADATA_DESCRIPTION.ARTIST]
        };
    }

    private reset()
    {
        this.audioMetadata = {};
        this.metadataId = undefined;
        this.id3v2TagSizeInByte = Infinity;
        this.audioFileReadCursorPosition = 0;
        this.memoryBufferReadCursorPosition = 0;
        this.isFinishedReadingAudioMetadata = false;
        this.memoryBufferByteData = Uint8Array.from([]);
    }

    private getMetadataId()
    {
        this.reset();
        let tagId = this.bytesToDecodedString(this.readFromAudioFile(3));
        if (tagId === this.ID3v2_METADATA_ID)
        {
            return tagId;
        }

        this.reset();
        tagId = this.bytesToDecodedString(this.readFromAudioFile(4));
        if (tagId === this.FLAC_METADATA_ID)
        {
            return tagId;
        }

        this.reset();
        return undefined;
    }

    private getDurationAsync()
    {
        const audioPlayer: AudioPlayer = createAudioPlayer(this.pathToAudioFile);
        return new Promise<number>(resolve =>
        {
            audioPlayer.addListener("playbackStatusUpdate", (audioStatus: AudioStatus) =>
            {
                if (audioStatus.isLoaded)
                {
                    audioPlayer.release();
                    resolve(audioStatus.duration || NaN);
                }
            });
        });
    }

    private readFLACMetadataBlock()
    {
        const metadataBlockType = this.bytesToBinaryString(this.readFromAudioFile(1));
        const isVorbisCommentBlock = metadataBlockType.endsWith("0000100");
        if (!isVorbisCommentBlock)
        {
            const metadataBlockSizeInByte = this.bytesToInt32(this.readFromAudioFile(3));
            this.readFromAudioFile(metadataBlockSizeInByte); // Skip irrelevant metadata blocks
        }
        else
        {
            this.readVorbisCommentBlock();
            this.isFinishedReadingAudioMetadata = true;
            return;
        }

        const isLastMetadataBlock = metadataBlockType.charAt(0) === "1";
        if (isLastMetadataBlock)
        {
            this.isFinishedReadingAudioMetadata = true;
            return;
        }
    }

    private readVorbisCommentBlock()
    {
        this.readFromAudioFile(3); // Skip getting metadataBlockSizeInByte

        const vendorSizeInByte = this.bytesToInt32(this.readFromAudioFile(4));
        this.readFromAudioFile(vendorSizeInByte); // Skip vendor field

        const userCommentCount = this.bytesToInt32(this.readFromAudioFile(4));
        for (let i = 0; i < userCommentCount; i++)
        {
            const userCommentSizeInByte = this.bytesToInt32(this.readFromAudioFile(4));
            const userCommentText = this.bytesToDecodedString(this.readFromAudioFile(userCommentSizeInByte));
            const [metadataKey, metadataValue] = userCommentText.split("=");
            switch (metadataKey.toLowerCase())
            {
                case this.AUDIO_METADATA_DESCRIPTION.TITLE.toLowerCase():
                    this.audioMetadata[this.AUDIO_METADATA_DESCRIPTION.TITLE] = metadataValue;
                    break;

                case this.AUDIO_METADATA_DESCRIPTION.ARTIST.toLowerCase():
                    this.audioMetadata[this.AUDIO_METADATA_DESCRIPTION.ARTIST] = metadataValue;
                    break;
            }

            if (this.isAllNecessaryMetadataAcquired)
            {
                this.isFinishedReadingAudioMetadata = true;
                return;
            }
        }
    }

    private readID3v2Header()
    {
        this.readFromAudioFile(2); // Skip header's "Version" field
        this.readFromAudioFile(1); // Skip header's "Flags" field
        this.id3v2TagSizeInByte = this.bytesToInt32(this.readFromAudioFile(4));
    }

    private readID3v2Frame()
    {
        const id3v2FrameID = this.bytesToDecodedString(this.readFromAudioFile(4));
        if (!id3v2FrameID)
        {
            this.isFinishedReadingAudioMetadata = true;
            return;
        }

        this.readFromAudioFile(2); // Skip frame's "Flags" field
        const id3v2FrameSizeInByte = this.bytesToInt32(this.readFromAudioFile(4));
        switch (id3v2FrameID)
        {
            case this.ID3v2_FRAME_ID.TITLE:
            case this.ID3v2_FRAME_ID.ARTIST:
                const id3v2FrameTextEncodingFieldSizeInByte = 1;
                this.readFromAudioFile(id3v2FrameTextEncodingFieldSizeInByte); // Skip frame's "Text encoding" field

                const id3v2FrameInformationFieldSizeInByte = id3v2FrameSizeInByte - id3v2FrameTextEncodingFieldSizeInByte;
                const id3v2FrameValue = this.bytesToDecodedString(this.readFromAudioFile(id3v2FrameInformationFieldSizeInByte));
                const id3v2FrameName: string = Object.fromEntries(Object.entries(this.ID3v2_FRAME_ID).map(x => x.reverse()))[id3v2FrameID];
                this.audioMetadata[id3v2FrameName] = id3v2FrameValue;
                break;

            default:
                this.readFromAudioFile(id3v2FrameSizeInByte);
        }

        if (this.isAllNecessaryMetadataAcquired)
        {
            this.isFinishedReadingAudioMetadata = true;
        }
    }

    private clearMemoryBufferThenReadNextChunkOfAudioFileToIt()
    {
        const audioFileHandle = new File(this.pathToAudioFile).open();
        audioFileHandle.offset = this.audioFileReadCursorPosition;

        const base64AudioFileContent = fromByteArray(audioFileHandle.readBytes(this.MEMORY_BUFFER_SIZE_IN_BYTE));
        this.setMemoryBufferByteData(toByteArray(base64AudioFileContent));
        this.audioFileReadCursorPosition += this.MEMORY_BUFFER_SIZE_IN_BYTE;
    }

    private readFromAudioFile(byteCount: number)
    {
        const byteChunk = [];
        for (let i = 0; i < byteCount; i++)
        {
            if (this.isFinishedReadingMemoryBuffer)
            {
                if (this.audioFileReadCursorPosition >= this.id3v2TagSizeInByte)
                {
                    this.isFinishedReadingAudioMetadata = true;
                    break;
                }

                this.clearMemoryBufferThenReadNextChunkOfAudioFileToIt();
            }

            byteChunk.push(this.readSingleByteFromMemoryBuffer());
        }

        return Uint8Array.from(byteChunk);
    }

    private bytesToDecodedString(bytes: Uint8Array)
    {
        let text = EMPTY_STRING;
        for (let i = 0; i < bytes.length; i++)
        {
            if (bytes[i] > 0)
            {
                text += String.fromCharCode(bytes[i]);
            }
        }

        return UTF8.decode(text);
    }

    private bytesToInt32(bytes: Uint8Array)
    {
        let int32 = 0;
        for (let i = 0; i < bytes.length; i++)
        {
            int32 |= bytes[bytes.length - i - 1] << i * 32;
        }

        return int32;
    }

    private bytesToBinaryString(bytes: Uint8Array)
    {
        let binaryString = EMPTY_STRING;
        for (let i = 0; i < bytes.length; i++)
        {
            binaryString += bytes[i].toString(2).padStart(8, "0");
        }

        return binaryString;
    }

    private setMemoryBufferByteData(byteData: Uint8Array)
    {
        this.memoryBufferByteData = byteData;
        this.memoryBufferReadCursorPosition = 0;
    }

    private readSingleByteFromMemoryBuffer() { return this.memoryBufferByteData[this.memoryBufferReadCursorPosition++]; }
};
