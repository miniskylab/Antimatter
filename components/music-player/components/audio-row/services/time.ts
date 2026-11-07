import {isNullOrUndefined} from "@miniskylab/antimatter-framework";

const timeFormatter = new Intl.DateTimeFormat("en-US", {minute: "2-digit", second: "2-digit"});
export function getFormattedTime(seconds?: number): string
{
    if (isNullOrUndefined(seconds) || !Number.isFinite(seconds))
    {
        return "--:--";
    }

    if (seconds === 3600)
    {
        return "60:00";
    }

    if (seconds > 3600)
    {
        return "+60:00";
    }

    return timeFormatter.format(new Date(seconds * 1000));
}
