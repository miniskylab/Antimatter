import {type AllPropertiesMustPresent, Nullable, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {DataList, DataListOperationMode} from "@miniskylab/data-list";
import React, {JSX, useMemo, useRef, useState} from "react";
import {ReminderItem} from "./components";
import {ReminderContext, ReminderProps, ReminderState} from "./models";
import * as Variant from "./variants";

/**
 * A component that alerts users of items they have input previously.
 */
export function Reminder({
    style = Variant.Default,
    reminderItems = {},
    selectedReminderItem,
    mode = DataListOperationMode.ReadOnly,
    maxSelectedTagCount = 3,
    displayPanel,
    addNewReminderItemButton,
    saveReminderItemButton,
    deleteReminderItemButton,
    cancelButton,
    customButton,
    onSwitchMode,
    onChangeReminderItem,
    onSelectReminderItem
}: ReminderProps): JSX.Element
{
    const props: AllPropertiesMustPresent<ReminderProps> = {
        style, reminderItems, selectedReminderItem, mode, maxSelectedTagCount, displayPanel, addNewReminderItemButton,
        saveReminderItemButton, deleteReminderItemButton, cancelButton, customButton, onSwitchMode, onChangeReminderItem,
        onSelectReminderItem
    };

    const [state, _] = useState<ReminderState>({
        toBeDeletedReminderItems: {}
    });

    const context = useMemo<ReminderContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const reminderItemsRef = useRef<Record<string, Nullable<ReminderItem.Ref>>>({});

    return (
        <ReminderContext.Provider value={context}>
            <DataList
                style={computedStyle.Root}
                mode={mode}
                displayPanel={displayPanel}
                addNewButton={addNewReminderItemButton}
                saveButton={saveReminderItemButton}
                deleteButton={deleteReminderItemButton}
                cancelButton={cancelButton}
                customButton={customButton}
                onSwitchMode={onSwitchMode}
            >
                {renderReminderItems()}
            </DataList>
        </ReminderContext.Provider>
    );

    function getReminderItemMode(reminderItemId: string): DataListOperationMode
    {
        return reminderItemId === selectedReminderItem?.id
            ? mode
            : DataListOperationMode.ReadOnly;
    }

    function renderReminderItems(): JSX.Element[]
    {
        return Object.keys(reminderItems).map(reminderItemId =>
        {
            const reminderItemMode = getReminderItemMode(reminderItemId);
            const reminderItemData = reminderItems[reminderItemId];
            const isSelectedReminderItem = reminderItemId === selectedReminderItem?.id;
            const isToBeDeletedReminderItem = !!state.toBeDeletedReminderItems[reminderItemId];

            return (
                <ReminderItem.Component
                    {...reminderItemData}
                    key={reminderItemId}
                    id={reminderItemId}
                    ref={ref => { reminderItemsRef.current[reminderItemId] = ref; }}
                    style={computedStyle.ReminderItem}
                    mode={reminderItemMode}
                    tags={reminderItemData?.tags}
                    maxSelectedTagCount={maxSelectedTagCount}
                    showProgressStripes={isSelectedReminderItem && selectedReminderItem?.showProgressStripes}
                    toBeDeleted={isToBeDeletedReminderItem}
                    onPress={!selectedReminderItem ? () => { onSelectReminderItem?.(reminderItemId); } : undefined}
                    onChange={newReminderData => { onChangeReminderItem?.(newReminderData); }}
                />
            );
        });
    }
}
