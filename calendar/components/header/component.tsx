import {Button} from "@miniskylab/antimatter-button";
import {IconName} from "@miniskylab/antimatter-icon";
import React from "react";
import {Animated} from "react-native";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    headline,
    onPrevClick,
    onNextClick,
    onHeadlineClick
}: Props): JSX.Element
{
    const {style: _, ...propsWithoutStyle} = arguments[0] as Props;
    const Style = style(propsWithoutStyle);

    return (
        <Animated.View style={Style.Root}>
            <Button
                style={Style.Navigator("left")}
                icon={IconName.ChevronLeft}
                disabled={!onPrevClick}
                onClick={onPrevClick}
            />
            <Button
                style={Style.Headline}
                label={headline}
                disabled={!onHeadlineClick}
                onClick={onHeadlineClick}
            />
            <Button
                style={Style.Navigator("right")}
                icon={IconName.ChevronRight}
                disabled={!onNextClick}
                onClick={onNextClick}
            />
        </Animated.View>
    );
}
