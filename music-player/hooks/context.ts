import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ButtonTypeContext, MusicPlayerContext} from "../models";

export function useMusicPlayerContext(): NonNullable<MusicPlayerContext> { return useContextOrThrow(MusicPlayerContext); }

export function useButtonTypeContext(): NonNullable<ButtonTypeContext> { return useContextOrThrow(ButtonTypeContext);}
