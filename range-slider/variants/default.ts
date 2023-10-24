import {Color} from "@miniskylab/antimatter-color-scheme";
import {Style} from "@miniskylab/antimatter-framework";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Pips} from "../components";
import {RangeSliderContextHook} from "../hooks";
import {RangeSliderStyle} from "../models";

const RangeSlider__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1
    };
};

const RangeSlider__Track: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        alignSelf: "stretch",
        height: 16,
        borderRadius: 8,
        marginVertical: 7,
        backgroundColor: Color.Mineshaft,
        cursor: rangeSliderContext.props.disabled ? "default" : "pointer"
    };
};

const RangeSlider__StopperLeft: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignSelf: "stretch",
        width: 15,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: Color.Primary
    };
};

const RangeSlider__StopperRight: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignSelf: "stretch",
        width: 14.5,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    };
};

const RangeSlider__FreeZone: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexDirection: "row",
        alignSelf: "stretch",
        zIndex: Style.Layer.Higher
    };
};

const RangeSlider__FillLeft: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignSelf: "stretch",
        backgroundColor: Color.Primary,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    };
};

const RangeSlider__FillRight: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignSelf: "stretch"
    };
};

const RangeSlider__Knob: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    return {
        ...ViewVariant.Default(viewProps),
        display: rangeSliderContext.props.disabled ? "none" : "flex",
        position: "absolute",
        width: 30,
        height: 30,
        borderWidth: 5,
        borderStyle: "solid",
        borderColor: Color.White,
        borderRadius: 15,
        backgroundColor: Color.Ambient,
        zIndex: Style.Layer.Higher,
        transform: [{translateX: -15}]
    };
};

const RangeSlider__KnobIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.White,
        fontSize: 15
    };
};

const RangeSlider__Pips__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignSelf: "stretch",
        justifyContent: "flex-start",
        height: 35,
        marginTop: 5,
        marginHorizontal: 15
    };
};

const RangeSlider__Pips__Pip: ViewStyle = function (viewProps)
{
    const isMilestone = Pips.ContextHook.useMilestoneContext();
    const isHighlighted = Pips.ContextHook.useHighlightedContext();

    return {
        ...ViewVariant.Default(viewProps),
        position: "absolute",
        width: 2,
        height: isMilestone ? 16 : 8,
        borderRadius: 10,
        backgroundColor: isHighlighted ? Color.Primary : Color.Gainsboro,
        transform: [{translateX: -1}, {rotateX: "-0.0000000001deg"}]
    };
};

const RangeSlider__Pips__Label: LabelStyle = function (labelProps)
{
    const isHighlighted = Pips.ContextHook.useHighlightedContext();

    return {
        ...LabelVariant.Default(labelProps),
        position: "absolute",
        width: 30,
        height: 30,
        paddingTop: 20,
        fontSize: 10,
        color: isHighlighted ? Color.Primary : Color.Gainsboro,
        transform: [{translateX: -15}]
    };
};

const RangeSlider__Pips: Pips.Style = function ()
{
    return {
        Root: RangeSlider__Pips__Root,
        Pip: RangeSlider__Pips__Pip,
        Label: RangeSlider__Pips__Label
    };
};

export const Default: RangeSliderStyle = function ()
{
    return {
        Root: RangeSlider__Root,
        Track: RangeSlider__Track,
        StopperLeft: RangeSlider__StopperLeft,
        StopperRight: RangeSlider__StopperRight,
        FillLeft: RangeSlider__FillLeft,
        FillRight: RangeSlider__FillRight,
        FreeZone: RangeSlider__FreeZone,
        Knob: RangeSlider__Knob,
        KnobIcon: RangeSlider__KnobIcon,
        Pips: RangeSlider__Pips
    };
};
