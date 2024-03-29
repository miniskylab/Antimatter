import {Color} from "@miniskylab/antimatter-color-scheme";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Pips} from "../../components";
import {RangeSliderContextHook} from "../../hooks";
import {RangeSliderStyle} from "../../models";
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
    const isHighlighted = Pips.ContextHook.useHighlightedContext();
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

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
    const isHighlighted = Pips.ContextHook.useHighlightedContext();
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

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
