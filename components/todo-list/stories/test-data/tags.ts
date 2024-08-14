import {Ts} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {Reminder} from "../../components";

export const Tags: Reminder.Props["tags"] = {
    "viverra": {name: "viverra"},
    "metus": {name: "metus"},
    "iaculis": {
        name: "iaculis",
        icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Money),
        metadata: new Set([Reminder.TagMetadata.HighlightTarget])
    },
    "sagittis": {name: "sagittis"},
    "dolore": {name: "dolore", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Apple)},
    "faucibus": {
        name: "faucibus",
        icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.PriceTag),
        metadata: new Set([
            Reminder.TagMetadata.HighlightTarget,
            Reminder.TagMetadata.MutuallyExclusive
        ])
    },
    "tortor": {name: "tortor"},
    "feugiat": {name: "feugiat", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Basket)},
    "volutpat": {name: "volutpat", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Road)},
    "mauris": {name: "mauris", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Alarm)},
    "interdum": {name: "interdum", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Plane)},
    "semper": {name: "semper", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Group)},
    "imperdiet": {name: "imperdiet", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Lightning)},
    "massa": {name: "massa", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.Droplet)},
    "adipiscing": {name: "adipiscing", icon: Ts.Enum.getName(DefaultIconSet, DefaultIconSet.WiFi)}
};
