import React, {JSX} from "react";
import {Animated} from "react-native";
import {EMPTY_STRING} from "../../data-type";
import {ImageProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Image({
    style = Variant.Default,
    uri,
    alt = EMPTY_STRING,
    resizeMode = "cover"
}: ImageProps): JSX.Element
{
    const props: Required<ImageProps> = {
        style, uri, alt, resizeMode
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <Animated.Image
            style={computedStyle}
            source={{uri}}
            alt={alt}
            resizeMode={resizeMode}
        />
    );
}
