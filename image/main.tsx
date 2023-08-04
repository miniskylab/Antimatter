import {EMPTY_STRING} from "@miniskylab/antimatter-framework";
import React, {JSX} from "react";
import {Animated} from "react-native";
import {ImageProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Image({
    style = Variant.Default,
    source,
    alt = EMPTY_STRING
}: ImageProps): JSX.Element
{
    const props: Required<ImageProps> = {
        style, source, alt
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <Animated.Image
            style={computedStyle}
            alt={alt}
            source={source}
            resizeMode={computedStyle.resizeMode}
        />
    );
}
