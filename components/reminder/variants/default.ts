import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {type ReminderStyle} from "../models";

const Reminder__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps)
    };
};

export const Default: ReminderStyle = function ()
{
    return {
        Root: Reminder__Root
    };
};
