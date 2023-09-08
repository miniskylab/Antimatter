import {Button} from "@miniskylab/antimatter-button";
import {IconName} from "@miniskylab/antimatter-icon";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {HeaderContext, NavigatorDirectionContext, Props} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    headline,
    onPrevPress,
    onNextPress,
    onHeadlinePress
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, headline, onPrevPress, onNextPress, onHeadlinePress
    };

    const context = useMemo<HeaderContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <HeaderContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <NavigatorDirectionContext.Provider value={"backward"}>
                    <Button
                        style={computedStyle.Navigator}
                        icon={IconName.ChevronLeft}
                        disabled={!onPrevPress}
                        onPress={onPrevPress}
                    />
                </NavigatorDirectionContext.Provider>
                <Button
                    style={computedStyle.Headline}
                    label={headline}
                    disabled={!onHeadlinePress}
                    onPress={onHeadlinePress}
                />
                <NavigatorDirectionContext.Provider value={"forward"}>
                    <Button
                        style={computedStyle.Navigator}
                        icon={IconName.ChevronRight}
                        disabled={!onNextPress}
                        onPress={onNextPress}
                    />
                </NavigatorDirectionContext.Provider>
            </View>
        </HeaderContext.Provider>
    );
}
