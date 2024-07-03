import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {type SpinningDoubleGearStyle} from "../models";

const SpinningDoubleGear__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        width: 102,
        height: 102
    };
};

const SpinningDoubleGear__GearContainer: ViewStyle = function ()
{
    return {
        marginLeft: -60,
        marginTop: -60
    };
};

const SpinningDoubleGear__Gear1: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        position: "absolute",
        top: -21,
        left: -21,
        fontSize: 60,
        color: Color.Blue
    };
};

const SpinningDoubleGear__Gear2: IconStyle = function (iconProps)
{
    return {
        ...SpinningDoubleGear__Gear1(iconProps),
        top: 21,
        left: 21,
        color: Color.Tomato
    };
};

export const Default: SpinningDoubleGearStyle = function ()
{
    return {
        Root: SpinningDoubleGear__Root,
        GearContainer: SpinningDoubleGear__GearContainer,
        Gear1: SpinningDoubleGear__Gear1,
        Gear2: SpinningDoubleGear__Gear2
    };
};
