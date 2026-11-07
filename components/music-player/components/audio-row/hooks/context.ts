import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {AudioRowContext} from "../models";

export function useAudioRowContext(): NonNullable<AudioRowContext> { return useContextOrThrow(AudioRowContext); }
