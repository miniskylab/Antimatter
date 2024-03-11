import {
    AllPropertiesMustPresent,
    inheritTextStyleFrom,
    isEnvironment,
    Ts,
    useComputedStyle,
    useTypography,
    WYSIWYG
} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {Animated} from "react-native";
import {TextProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Text({
    style = Variant.Default,
    children,
    selectable = true,
    numberOfLines = 0,
    pointerEvents = "auto"
}: TextProps): JSX.Element
{
    const props: AllPropertiesMustPresent<TextProps> = {
        style, children, selectable, numberOfLines, pointerEvents
    };

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const isWebEnvironment = isEnvironment("Web");

    return (
        <View
            style={() => ({
                ...computedStyle,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0
            })}
            pointerEvents={pointerEvents}
        >
            <Animated.Text
                selectable={selectable}
                numberOfLines={numberOfLines}
                style={{
                    ...inheritTextStyleFrom(computedStyle),
                    ...useTypography(computedStyle),
                    padding: computedStyle.padding,
                    paddingVertical: computedStyle.paddingVertical,
                    paddingHorizontal: computedStyle.paddingHorizontal,
                    paddingTop: computedStyle.paddingTop,
                    paddingBottom: computedStyle.paddingBottom,
                    paddingLeft: computedStyle.paddingLeft,
                    paddingRight: computedStyle.paddingRight,
                    ...isWebEnvironment && numberOfLines !== 1 && {whiteSpace: "inherit"}
                }}
            >
                {children && (isWebEnvironment ? WYSIWYG.render(children) : children)}
            </Animated.Text>
        </View>
    );
}
