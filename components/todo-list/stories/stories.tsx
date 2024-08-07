import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Reminder} from "../main";
import {ReminderProps} from "../models";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const ReminderWithValidation = withValidation(Reminder, ReminderProps);
export default {
    component: Reminder,
    title: "Components/Reminder",
    render: args =>
    {
        return (
            <ReminderWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                addNewReminderItemButton={{
                    ...args.addNewReminderItemButton,
                    icon: DefaultIconSet.PlusCircle,
                    text: "Add New",
                    onPress: () => { }
                }}
                saveReminderItemButton={{
                    ...args.saveReminderItemButton,
                    icon: DefaultIconSet.FloppyDisk,
                    text: "Save",
                    onPress: async () => { }
                }}
                deleteReminderItemButton={{
                    ...args.deleteReminderItemButton,
                    icon: DefaultIconSet.TrashCan,
                    text: "Delete",
                    onPress: async () => { }
                }}
                cancelButton={{
                    ...args.cancelButton,
                    icon: DefaultIconSet.XMarkInsideCircle,
                    text: "Cancel",
                    onPress: () => { }
                }}
            />
        );
    }
} satisfies Meta<typeof Reminder>;
type Story = StoryObj<typeof Reminder>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        maxSelectedTagCount: Sb.number(0),
        reminderItems: Sb.locked,
        selectedReminderItem: Sb.locked,
        mode: Sb.locked,
        displayPanel: Sb.locked,
        addNewReminderItemButton: Sb.locked,
        saveReminderItemButton: Sb.locked,
        deleteReminderItemButton: Sb.locked,
        cancelButton: Sb.locked,
        customButton: Sb.locked,
        onChangeReminderItem: Sb.locked,
        onSelectReminderItem: Sb.locked,
        onSwitchMode: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        maxSelectedTagCount: 3,
        reminderItems: {...TestData.ReminderItems}
    }
};
