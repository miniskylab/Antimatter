import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Mode} from "./enums";
import {DataListContext, DataListProps} from "./models";
import type {ControlPanel} from "./types";
import * as Variant from "./variants";

/**
 * A series of items displayed consecutively one below the other.
 */
export function DataList({
    style = Variant.Default,
    children,
    displayPanel,
    mode = Mode.ReadOnly,
    addNewButton,
    saveButton,
    deleteButton,
    cancelButton,
    customButton,
    onSwitchMode
}: DataListProps): JSX.Element
{
    const props: AllPropertiesMustPresent<DataListProps> = {
        style, children, displayPanel, mode, addNewButton, saveButton, deleteButton, cancelButton, customButton, onSwitchMode
    };

    const context = useMemo<DataListContext>(
        () => ({props}),
        [...Object.values(props)]
    );

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

    function getControlPanel(): ControlPanel
    {
        switch (mode)
        {
            case Mode.Draft:
                return {
                    button1: {...saveButton},
                    button2: {icon: DefaultIconSet.Quill, text: "Draft-Mode", disabled: true},
                    button3: {...cancelButton}
                };

            case Mode.Edit:
                return {
                    button1: {...saveButton},
                    button2: {icon: DefaultIconSet.Quill, text: "Edit-Mode", onPress: switchMode},
                    button3: {...cancelButton}
                };

            case Mode.Delete:
                return {
                    button1: {...deleteButton},
                    button2: {icon: DefaultIconSet.Fire, text: "Delete-Mode", onPress: switchMode},
                    button3: {...cancelButton}
                };

            default:
            case Mode.ReadOnly:
                return {
                    button1: {...addNewButton},
                    button2: {icon: DefaultIconSet.Eye, text: "Read-Only", disabled: true},
                    button3: customButton ? {...customButton} : {...cancelButton, disabled: true}
                };
        }
    }

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
        const {button1, button2, button3} = getControlPanel();
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

    function switchMode(): void
    {
        switch (mode)
        {
            case Mode.ReadOnly:
                onSwitchMode?.(Mode.Draft);
                break;

            case Mode.Edit:
                onSwitchMode?.(Mode.Delete);
                break;

            case Mode.Delete:
                onSwitchMode?.(Mode.Edit);
                break;

            default:
                throw new Error(`No valid mode to switch to from mode "${Ts.Enum.getName(Mode, mode)}"`);
        }
    }
}
