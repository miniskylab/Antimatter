import {Color} from "@miniskylab/antimatter-color-scheme";
import {type PressableStyle} from "@miniskylab/antimatter-pressable";
import {ButtonContextHook} from "../../hooks";
import {type ButtonStyle} from "../../models";
import * as ButtonVariant from "../../variants";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        ...pressableState.pressed
            ? {
                borderColor: Color.Green__b10,
                backgroundColor: Color.Green__b10
            }
            : pressableState.hovered
                ? {
                    borderColor: Color.Green__w25,
                    backgroundColor: Color.Green__w25
                }
                : {
                    borderColor: Color.Green,
                    backgroundColor: Color.Green
                }
    };
};

export const SolidRectangularGreen: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.SolidRectangular(buttonProps),
        Root: Button__Root
    };
};
