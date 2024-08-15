import {type AllPropertiesMustPresent, Ts, useComputedStyle, useEnvironment} from "@miniskylab/antimatter-framework";
import React, {forwardRef, JSX, MutableRefObject, useEffect, useImperativeHandle, useRef, WheelEvent} from "react";
import ReactNative, {Animated} from "react-native";
import {ScrollViewProps} from "./models";
import * as Variant from "./variants";

/**
 * @see https://reactnative.dev/docs/scrollview
 */
export const ScrollView = forwardRef(function ScrollView(
    {
        style = Variant.Default,
        children,
        horizontal = false,
        stickyHeaderIndices = [],
        contentInsetAdjustmentBehavior,
        showsVerticalScrollIndicator = true,
        showsHorizontalScrollIndicator = true,
        automaticallyAdjustKeyboardInsets = false,
        refreshControl
    }: ScrollViewProps,
    ref: MutableRefObject<ScrollView>
): JSX.Element
{
    const props: AllPropertiesMustPresent<ScrollViewProps> = {
        style, children, horizontal, stickyHeaderIndices, contentInsetAdjustmentBehavior, showsVerticalScrollIndicator,
        showsHorizontalScrollIndicator, automaticallyAdjustKeyboardInsets, refreshControl
    };

    const internalRef = useRef<ScrollView>(null);

    const isRunningOnDesktopWeb = useEnvironment("DesktopWeb");

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle, imperativeHandles} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({...internalRef.current!, ...imperativeHandles}), []);

    useEffect(() =>
    {
        if (!isRunningOnDesktopWeb || !horizontal || !internalRef)
        {
            return;
        }

        const scrollableNode = internalRef.current?.getScrollableNode();
        const wheelEventListener = scrollableNode.addEventListener("wheel", (event: WheelEvent) =>
        {
            if (event.deltaY === 0)
            {
                return;
            }

            internalRef.current?.scrollTo({
                x: scrollableNode.scrollLeft + event.deltaY,
                animated: true
            });
        });

        return () => scrollableNode.removeEventListener("wheel", wheelEventListener);
    }, [internalRef, horizontal]);

    return (
        <Animated.ScrollView
            ref={internalRef}
            style={{
                ...computedStyle,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                alignItems: undefined
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
                paddingHorizontal: computedStyle.paddingHorizontal,
                alignItems: computedStyle.alignItems
            }}
            refreshControl={refreshControl}
            stickyHeaderIndices={stickyHeaderIndices}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
            automaticallyAdjustKeyboardInsets={automaticallyAdjustKeyboardInsets}
            horizontal={horizontal}
        >
            {children}
        </Animated.ScrollView>
    );
});

export type ScrollView<TExtra extends object = object> = Omit<ReactNative.ScrollView, keyof TExtra> & TExtra;
