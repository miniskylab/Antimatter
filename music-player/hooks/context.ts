import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {MusicPlayerContext} from "../models";

export function useMusicPlayerContext(): NonNullable<MusicPlayerContext> { return useContextOrThrow(MusicPlayerContext); }
