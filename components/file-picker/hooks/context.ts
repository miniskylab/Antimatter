import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {FilePickerContext} from "../models";

export function useFilePickerContext(): NonNullable<FilePickerContext>
{
    return useContextOrThrow(FilePickerContext);
}
