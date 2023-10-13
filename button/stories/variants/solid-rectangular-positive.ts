import {Color} from "@miniskylab/antimatter-color-scheme";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ButtonContextHook} from "../../hooks";
import {ButtonStyle} from "../../models";
import * as ButtonVariant from "../../variants";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        ...pressableState.pressed
            ? {
                borderColor: Color.Positive__b10,
                backgroundColor: Color.Positive__b10
            }
            : pressableState.hovered
                ? {
                    borderColor: Color.Positive__w25,
                    backgroundColor: Color.Positive__w25
                }
                : {
                    borderColor: Color.Positive,
                    backgroundColor: Color.Positive
                }
    };
};

export const SolidRectangularPositive: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.SolidRectangular(buttonProps),
        Root: Button__Root
    };
};
