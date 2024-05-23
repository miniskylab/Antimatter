import {isNullOrUndefined} from "@miniskylab/antimatter-framework";

const timeFormatter = new Intl.DateTimeFormat("en-US", {minute: "2-digit", second: "2-digit"});
export function getFormattedTime(seconds?: number): string
{
    return isNullOrUndefined(seconds)
        ? "--:--"
        : seconds > 3599 ? "+59:59" : timeFormatter.format(new Date(seconds * 1000));
}
