import {Enum} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {TransactionRecord} from "../../components";

export const labels: TransactionRecord.Props["labels"] = {
    "viverra": {name: "viverra"},
    "metus": {name: "metus"},
    "iaculis": {
        name: "iaculis",
        icon: Enum.getName(DefaultIconSet, DefaultIconSet.Money),
        type: TransactionRecord.TransactionLabelType.Income
    },
    "sagittis": {name: "sagittis"},
    "dolore": {name: "dolore", icon: Enum.getName(DefaultIconSet, DefaultIconSet.Apple)},
    "tortor": {name: "tortor"},
    "feugiat": {name: "feugiat", icon: Enum.getName(DefaultIconSet, DefaultIconSet.Basket)},
    "volutpat": {name: "volutpat", icon: Enum.getName(DefaultIconSet, DefaultIconSet.Road)},
    "mauris": {name: "mauris", icon: Enum.getName(DefaultIconSet, DefaultIconSet.GasStation)},
    "interdum": {name: "interdum", icon: Enum.getName(DefaultIconSet, DefaultIconSet.Plane)},
    "semper": {name: "semper", icon: Enum.getName(DefaultIconSet, DefaultIconSet.Group)},
    "imperdiet": {name: "imperdiet", icon: Enum.getName(DefaultIconSet, DefaultIconSet.Lightning)},
    "massa": {name: "massa", icon: Enum.getName(DefaultIconSet, DefaultIconSet.Droplet)},
    "adipiscing": {name: "adipiscing", icon: Enum.getName(DefaultIconSet, DefaultIconSet.WiFi)},
    "faucibus": {name: "faucibus", icon: Enum.getName(DefaultIconSet, DefaultIconSet.PriceTag)}
};
