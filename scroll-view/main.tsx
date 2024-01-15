import {AllPropertiesMustPresent, Environment, Style, Ts} from "@miniskylab/antimatter-framework";
import React, {forwardRef, JSX, MutableRefObject, useEffect, useRef, WheelEvent} from "react";
import ReactNative, {Animated} from "react-native";
import {ScrollViewProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export const ScrollView = forwardRef(function ScrollView(
    {
        style = Variant.Default,
        children,
        horizontal = false,
        stickyHeaderIndices = [],
        showsVerticalScrollIndicator = true,
        showsHorizontalScrollIndicator = true
    }: ScrollViewProps,
    ref: MutableRefObject<ScrollView>
): JSX.Element
{
    const props: AllPropertiesMustPresent<ScrollViewProps> = {
        style, children, horizontal, stickyHeaderIndices, showsVerticalScrollIndicator, showsHorizontalScrollIndicator
    };

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = Style.useComputedStyle(style, props);

    const runningOnDesktopWeb = Environment.use("DesktopWeb");
    if (!ref)
    {
        ref = useRef<ScrollView>();
    }

    useEffect(() =>
    {
        if (!runningOnDesktopWeb || !horizontal)
        {
            return;
        }

        const scrollableNode = ref.current.getScrollableNode();
        const wheelEventListener = scrollableNode.addEventListener("wheel", (event: WheelEvent) =>
        {
            if (event.deltaY === 0)
            {
                return;
            }

            ref.current.scrollTo({
                x: scrollableNode.scrollLeft + event.deltaY,
                animated: true
            });
        });

        return () => scrollableNode.removeEventListener("wheel", wheelEventListener);
    }, [runningOnDesktopWeb, horizontal]);

    return (
        <Animated.ScrollView
            ref={ref}
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
                paddingRight: computedStyle.paddingRight,
                paddingVertical: computedStyle.paddingVertical,
                paddingHorizontal: computedStyle.paddingHorizontal
            }}
            stickyHeaderIndices={stickyHeaderIndices}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            horizontal={horizontal}
        >
            {children}
        </Animated.ScrollView>
    );
});

export type ScrollView = ReactNative.ScrollView;
