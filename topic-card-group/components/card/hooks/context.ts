import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {CardContext} from "../models";

export function useCardContext(): NonNullable<CardContext> { return useContextOrThrow(CardContext); }
