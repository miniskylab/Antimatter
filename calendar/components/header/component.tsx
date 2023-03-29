import {Button} from "@miniskylab/antimatter-button";
import {IconName} from "@miniskylab/antimatter-icon";
import React from "react";
import {Animated} from "react-native";
import {NavigatorDirectionContext, Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    id,
    style,
    onReadyToUnmount,
    headline,
    onPrevClick,
    onNextClick,
    onHeadlineClick
}: Props): JSX.Element
{
    const props: Required<Props> = {
        id, style, onReadyToUnmount, headline, onPrevClick, onNextClick, onHeadlineClick
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <Animated.View style={computedStyle.Root}>
            <NavigatorDirectionContext.Provider value={"backward"}>
                <Button
                    style={computedStyle.Navigator}
                    icon={IconName.ChevronLeft}
                    disabled={!onPrevClick}
                    onClick={onPrevClick}
                />
            </NavigatorDirectionContext.Provider>
            <Button
                style={computedStyle.Headline}
                label={headline}
                disabled={!onHeadlineClick}
                onClick={onHeadlineClick}
            />
            <NavigatorDirectionContext.Provider value={"forward"}>
                <Button
                    style={computedStyle.Navigator}
                    icon={IconName.ChevronRight}
                    disabled={!onNextClick}
                    onClick={onNextClick}
                />
            </NavigatorDirectionContext.Provider>
        </Animated.View>
    );
}
