import {Color} from "@miniskylab/antimatter-color-scheme";
import {CursorType, Layer} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Pips} from "../components";
import {RangeSliderContextHook} from "../hooks";
import {type RangeSliderStyle} from "../models";

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
        cursor: rangeSliderContext.props.disabled ? CursorType.Default : CursorType.Pointer
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
        backgroundColor: Color.Blue
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
        zIndex: Layer.Higher
    };
};

const RangeSlider__FillLeft: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignSelf: "stretch",
        backgroundColor: Color.Blue,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    };
};

const RangeSlider__FillRight: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignSelf: "stretch",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
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
        zIndex: Layer.Higher,
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
    const pipsContext = Pips.ContextHook.usePipsContext();
    const pipIndex = Pips.ContextHook.usePipIndexContext();

    const pipCount = Pips.Service.getPipCount(pipsContext.props.step, pipsContext.props.minValue, pipsContext.props.maxValue);
    const isMilestone = Pips.Service.isMilestonePip(pipIndex, pipsContext.props.step, pipsContext.props.milestoneStep);
    const isHighlighted = Pips.Service.isHighlightedPip(
        pipIndex,
        pipCount,
        pipsContext.props.minValue,
        pipsContext.props.maxValue,
        pipsContext.props.startValue,
        pipsContext.props.endValue
    );

    return {
        ...ViewVariant.Default(viewProps),
        position: "absolute",
        width: 2,
        height: isMilestone ? 16 : 8,
        borderRadius: 10,
        backgroundColor: isHighlighted ? Color.Blue : Color.Gainsboro,
        transform: [{translateX: -1}, {rotateX: "-0.0000000001deg"}]
    };
};

const RangeSlider__Pips__Label: TextStyle = function (textProps)
{
    const pipsContext = Pips.ContextHook.usePipsContext();
    const pipIndex = Pips.ContextHook.usePipIndexContext();

    const pipCount = Pips.Service.getPipCount(pipsContext.props.step, pipsContext.props.minValue, pipsContext.props.maxValue);
    const isHighlighted = Pips.Service.isHighlightedPip(
        pipIndex,
        pipCount,
        pipsContext.props.minValue,
        pipsContext.props.maxValue,
        pipsContext.props.startValue,
        pipsContext.props.endValue
    );

    return {
        ...TextVariant.Default(textProps),
        position: "absolute",
        width: 30,
        height: 30,
        paddingTop: 20,
        fontSize: 10,
        textAlign: "center",
        color: isHighlighted ? Color.Blue : Color.Gainsboro,
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
