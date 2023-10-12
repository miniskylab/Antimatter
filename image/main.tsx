import {EMPTY_STRING, Style} from "@miniskylab/antimatter-framework";
import React, {JSX} from "react";
import {Animated} from "react-native";
import {ImageProps} from "./models";
import * as Variant from "./variants";

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

    const computedStyle = Style.useComputedStyle(style, props);

    return (
        <Animated.Image
            style={computedStyle}
            alt={alt}
            source={source}
            resizeMode={computedStyle.resizeMode}
        />
    );
}
