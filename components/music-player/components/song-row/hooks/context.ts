import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SongRowContext} from "../models";

export function useSongRowContext(): NonNullable<SongRowContext> { return useContextOrThrow(SongRowContext); }
