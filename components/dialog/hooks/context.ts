import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {DialogContext} from "../models";

export function useDialogContext(): NonNullable<DialogContext>
{
    return useContextOrThrow(DialogContext);
}
