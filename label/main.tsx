import {Environment, Html, inheritTextStyleFrom, useEnvironment} from "@miniskylab/antimatter-framework";
import {getFontFamily, useTypography} from "@miniskylab/antimatter-typography";
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
    const props: Required<LabelProps> = {
        style, children, selectable, numberOfLines, pointerEvents
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    const runningOnWeb = useEnvironment(Environment.Web);
    const [fontsLoaded] = useTypography();

    if (!fontsLoaded)
    {
        return null;
    }

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
                    fontFamily: getFontFamily(computedStyle),
                    padding: computedStyle.padding,
                    paddingVertical: computedStyle.paddingVertical,
                    paddingHorizontal: computedStyle.paddingHorizontal,
                    paddingTop: computedStyle.paddingTop,
                    paddingBottom: computedStyle.paddingBottom,
                    paddingLeft: computedStyle.paddingLeft,
                    paddingRight: computedStyle.paddingRight
                }}
            >
                {runningOnWeb ? Html.render(children) : children}
            </Animated.Text>
        </View>
    );
}
