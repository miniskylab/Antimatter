import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "@miniskylab/antimatter-text";
import {type ViewStyle} from "@miniskylab/antimatter-view";
import {Pips} from "../../components";
import {RangeSliderContextHook} from "../../hooks";
import {type RangeSliderStyle} from "../../models";
import * as RangeSliderVariant from "../../variants";

const RangeSlider__StopperLeft: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).StopperLeft(viewProps);

    return {
        ...inheritedStyle,
        backgroundColor: Color.Green
    };
};

const RangeSlider__StopperRight: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).StopperRight(viewProps);

    return {
        ...inheritedStyle,
        backgroundColor: Color.Gold
    };
};

const RangeSlider__FillLeft: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).FillLeft(viewProps);

    return {
        ...inheritedStyle,
        backgroundColor: Color.Green
    };
};

const RangeSlider__FillRight: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).FillRight(viewProps);

    return {
        ...inheritedStyle,
        backgroundColor: Color.Gold
    };
};

const RangeSlider__Pips__Pip: ViewStyle = function (viewProps)
{
    const pipsContext = Pips.ContextHook.usePipsContext();
    const pipIndex = Pips.ContextHook.usePipIndexContext();
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const pipCount = Pips.Service.getPipCount(pipsContext.props.step, pipsContext.props.minValue, pipsContext.props.maxValue);
    const isHighlighted = Pips.Service.isHighlightedPip(
        pipIndex,
        pipCount,
        pipsContext.props.minValue,
        pipsContext.props.maxValue,
        pipsContext.props.startValue,
        pipsContext.props.endValue
    );

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props)
        .Pips(pipsContext.props)
        .Pip(viewProps);

    return {
        ...inheritedStyle,
        backgroundColor: isHighlighted ? Color.Green : Color.Gold
    };
};

const RangeSlider__Pips__Label: TextStyle = function (textProps)
{
    const pipsContext = Pips.ContextHook.usePipsContext();
    const pipIndex = Pips.ContextHook.usePipIndexContext();
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const pipCount = Pips.Service.getPipCount(pipsContext.props.step, pipsContext.props.minValue, pipsContext.props.maxValue);
    const isHighlighted = Pips.Service.isHighlightedPip(
        pipIndex,
        pipCount,
        pipsContext.props.minValue,
        pipsContext.props.maxValue,
        pipsContext.props.startValue,
        pipsContext.props.endValue
    );

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props)
        .Pips(pipsContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        color: isHighlighted ? Color.Green : Color.Gold
    };
};

const RangeSlider__Pips: Pips.Style = function (pipProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).Pips(pipProps);

    return {
        ...inheritedStyle,
        Pip: RangeSlider__Pips__Pip,
        Label: RangeSlider__Pips__Label
    };
};

export const ColorStack: RangeSliderStyle = function (rangeSliderProps)
{
    return {
        ...RangeSliderVariant.Default(rangeSliderProps),
        StopperLeft: RangeSlider__StopperLeft,
        StopperRight: RangeSlider__StopperRight,
        FillLeft: RangeSlider__FillLeft,
        FillRight: RangeSlider__FillRight,
        Pips: RangeSlider__Pips
    };
};
