import {Button} from "@miniskylab/antimatter-button";
import {IconName} from "@miniskylab/antimatter-icon";
import React, {useMemo} from "react";
import {Animated} from "react-native";
import {HeaderContext, NavigatorDirectionContext, Props} from "./model";

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
    const props: Required<Props> = {
        style, headline, onPrevClick, onNextClick, onHeadlineClick
    };

    const context = useMemo<HeaderContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <HeaderContext.Provider value={context}>
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
        </HeaderContext.Provider>
    );
}
