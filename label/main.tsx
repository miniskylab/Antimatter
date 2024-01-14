import {AllPropertiesMustPresent, Environment, Html, inheritTextStyleFrom, Style} from "@miniskylab/antimatter-framework";
import {useTypography} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {Animated} from "react-native";
import {LabelProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Label({
    style = Variant.Default,
    children,
    selectable = true,
    numberOfLines = 0,
    pointerEvents = "auto"
}: LabelProps): JSX.Element
{
    const props: AllPropertiesMustPresent<LabelProps> = {
        style, children, selectable, numberOfLines, pointerEvents
    };

    const computedStyle = Style.useComputedStyle(style, props);
    const isWebEnvironment = Environment.is("Web");

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
                {isWebEnvironment ? Html.render(children) : children}
            </Animated.Text>
        </View>
    );
}
