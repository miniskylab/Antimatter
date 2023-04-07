import React from "react";
import {Animated} from "react-native";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    id,
    style,
    children,
    onReadyToUnmount
}: Props): JSX.Element
{
    const props: Required<Props> = {
        id, style, children, onReadyToUnmount
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <Animated.View style={computedStyle.Root}>
            {children}
        </Animated.View>
    );
}
