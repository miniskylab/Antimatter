import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, EMPTY_STRING, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {DataListContext, DataListProps} from "./models";
import * as Variant from "./variants";

/**
 * A series of items displayed consecutively one below the other.
 */
export function DataList({
    style = Variant.Default,
    children,
    displayPanel,
    button1,
    button2,
    button3
}: DataListProps): JSX.Element
{
    const props: AllPropertiesMustPresent<DataListProps> = {
        style, children, displayPanel, button1, button2, button3
    };

    const context = useComponentContext<DataListContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <DataListContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {renderControlPanel()}
                {renderDisplayPanel()}
                <View style={computedStyle.TopHr}/>
                <ScrollView
                    style={computedStyle.ItemContainer}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                    contentInsetAdjustmentBehavior={"scrollableAxes"}
                >
                    {children}
                </ScrollView>
                <View style={computedStyle.BottomHr}/>
            </View>
        </DataListContext.Provider>
    );

    function renderDisplayPanel(): JSX.Element
    {
        const displayIcon = displayPanel?.icon ?? DefaultIconSet.None;
        const displayMessage = displayPanel?.message ?? EMPTY_STRING;

        return (
            <View style={computedStyle.DisplayPanel} pointerEvents={displayPanel?.isVisible ? "auto" : "none"}>
                <Icon style={computedStyle.DisplayIcon} name={displayIcon} pointerEvents={"none"} selectable={false}/>
                <Text style={computedStyle.DisplayMessage} pointerEvents={"none"} selectable={false}>{displayMessage}</Text>
            </View>
        );
    }

    function renderControlPanel(): JSX.Element
    {
        return (
            <View style={computedStyle.ControlPanel}>
                <Button
                    style={computedStyle.Button1}
                    icon={button1.icon}
                    label={button1.text}
                    disabled={button1.disabled}
                    onPress={button1.onPress}
                />
                <Button
                    style={computedStyle.Button2}
                    icon={button2.icon}
                    label={button2.text}
                    disabled={button2.disabled}
                    onPress={button2.onPress}
                />
                <Button
                    style={computedStyle.Button3}
                    icon={button3.icon}
                    label={button3.text}
                    disabled={button3.disabled}
                    onPress={button3.onPress}
                />
            </View>
        );
    }
}
