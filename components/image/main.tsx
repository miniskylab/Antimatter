import {AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import React, {JSX} from "react";
import {Animated} from "react-native";
import {ImageProps} from "./models";
import * as Variant from "./variants";

/**
 * A component for displaying different types of images.
 */
export function Image({
    style = Variant.Default,
    source,
    alt = EMPTY_STRING
}: ImageProps): JSX.Element
{
    const props: AllPropertiesMustPresent<ImageProps> = {
        style, source, alt
    };

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <Animated.Image
            style={computedStyle}
            alt={alt}
            source={source}
            resizeMode={computedStyle.resizeMode}
        />
    );
}
