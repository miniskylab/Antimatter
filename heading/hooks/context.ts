import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {HeadingContext} from "../models";

export function useHeadingContext(): NonNullable<HeadingContext> { return useContextOrThrow(HeadingContext); }
