import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {HeaderContext, type Props} from "./models";

export function Component({
    style,
    headline,
    onPrevPress,
    onNextPress,
    onHeadlinePress
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, headline, onPrevPress, onNextPress, onHeadlinePress
    };

    const context = useComponentContext<HeaderContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <HeaderContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Button
                    style={computedStyle.BackwardNavigator}
                    icon={DefaultIconSet.ChevronLeft}
                    disabled={!onPrevPress}
                    onPress={onPrevPress}
                />
                <Button
                    style={computedStyle.Headline}
                    label={headline}
                    disabled={!onHeadlinePress}
                    onPress={onHeadlinePress}
                />
                <Button
                    style={computedStyle.ForwardNavigator}
                    icon={DefaultIconSet.ChevronRight}
                    disabled={!onNextPress}
                    onPress={onNextPress}
                />
            </View>
        </HeaderContext.Provider>
    );
}
