import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ButtonContext} from "../models";

export function useButtonContext(): NonNullable<ButtonContext> { return useContextOrThrow(ButtonContext); }
