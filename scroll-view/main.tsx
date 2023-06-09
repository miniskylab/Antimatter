import React, {JSX, useEffect, useRef} from "react";
import ReactNative, {Animated, Platform} from "react-native";
import {ScrollViewProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function ScrollView({
    style = Variant.Default,
    children,
    horizontal = false,
    showsVerticalScrollIndicator = true,
    showsHorizontalScrollIndicator = true
}: ScrollViewProps): JSX.Element
{
    const props: Required<ScrollViewProps> = {
        style, children, horizontal, showsVerticalScrollIndicator, showsHorizontalScrollIndicator
    };

    const scrollViewRef = useRef<ReactNative.ScrollView>();

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    useEffect(() =>
    {
        if (Platform.OS !== "web" || !horizontal)
        {
            return;
        }

        const scrollableNode = scrollViewRef.current.getScrollableNode();
        const wheelEventListener = scrollableNode.addEventListener("wheel", (event: React.WheelEvent) =>
        {
            if (event.deltaY === 0)
            {
                return;
            }

            scrollViewRef.current.scrollTo({
                x: scrollableNode.scrollLeft + event.deltaY,
                animated: true
            });
        });

        return () => scrollableNode.removeEventListener("wheel", wheelEventListener);
    }, [Platform.OS, horizontal]);

    return (
        <Animated.ScrollView
            ref={scrollViewRef}
            style={{
                ...computedStyle,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0
            }}
            contentContainerStyle={{
                gap: computedStyle.gap,
                rowGap: computedStyle.rowGap,
                columnGap: computedStyle.columnGap,
                paddingTop: computedStyle.paddingTop,
                paddingBottom: computedStyle.paddingBottom,
                paddingLeft: computedStyle.paddingLeft,
                paddingRight: computedStyle.paddingRight
            }}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            horizontal={horizontal}
        >
            {children}
        </Animated.ScrollView>
    );
}
