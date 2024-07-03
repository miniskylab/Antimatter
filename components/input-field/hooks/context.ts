import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {InputFieldContext} from "../models";

export function useInputFieldContext(): NonNullable<InputFieldContext> { return useContextOrThrow(InputFieldContext); }
