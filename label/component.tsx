import React from "react";
import {Text} from "react-native";
import {LabelProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Label({
    style,
    children
}: LabelProps): JSX.Element
{
    return (
        <Text style={style.Root}>{children}</Text>
    );
}
