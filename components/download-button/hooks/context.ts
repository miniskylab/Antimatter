import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {DownloadButtonContext} from "../models";

export function useDownloadButtonContext(): NonNullable<DownloadButtonContext> { return useContextOrThrow(DownloadButtonContext); }
