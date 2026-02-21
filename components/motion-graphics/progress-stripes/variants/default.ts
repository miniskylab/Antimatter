import {Color} from "@miniskylab/antimatter-color-scheme";
import {type ViewStyle} from "@miniskylab/antimatter-view";
import {ProgressStripesAnimationHook, ProgressStripesContextHook} from "../hooks";
import {type ProgressStripesStyle} from "../models";

const ProgressStripes__Root: ViewStyle = function ()
{
    return {
        alignItems: "flex-end",
        width: 800,
        height: 30,
        overflow: "hidden",
        backgroundColor: Color.Transparent
    };
};

const ProgressStripes__Slider: ViewStyle = function ()
{
    return {
        flex: 1,
        flexDirection: "row",
        transformOrigin: "bottom",
        animations: [
            () => ProgressStripesAnimationHook.useStripeAnimation()
        ]
    };
};

const ProgressStripes__Stripe: ViewStyle = function ()
{
    const stripeIndex = ProgressStripesContextHook.useStripeIndexContext();

    return {
        width: 30,
        backgroundColor: stripeIndex % 2 === 0
            ? Color.Blue__a65
            : Color.Background
    };
};

export const Default: ProgressStripesStyle = function ()
{
    return {
        Root: ProgressStripes__Root,
        Slider: ProgressStripes__Slider,
        Stripe: ProgressStripes__Stripe
    };
};
