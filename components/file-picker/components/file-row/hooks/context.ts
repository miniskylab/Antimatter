import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {FileRowContext} from "../models";

export function useFileRowContext(): NonNullable<FileRowContext> { return useContextOrThrow(FileRowContext); }
