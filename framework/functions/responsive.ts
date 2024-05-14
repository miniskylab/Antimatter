import type {Breakpoint} from "../types";

export function getScreenSizeFromBreakpoint(breakpoint: Breakpoint): number
{
    switch (breakpoint)
    {
        case "Small":
            return 576;

        case "Medium":
            return 769;

        case "Large":
            return 1025;

        case "ExtraLarge":
            return 1200;
    }
}
