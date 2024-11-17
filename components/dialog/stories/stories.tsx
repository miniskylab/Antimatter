import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Dialog} from "../main";
import {DialogProps} from "../models";
import * as Variant from "../variants";

export default {
    component: Dialog,
    title: "Components/Dialog"
} satisfies Meta<typeof Dialog>;
type Story = StoryObj<typeof Dialog>;

const DialogWithValidation = withValidation(Dialog, DialogProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        title: Sb.text(),
        subtitle: Sb.text(),
        icon: Sb.enumDropdown(DefaultIconSet),
        onConfirm: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        title: "Lorem ipsum dolor sit amet",
        subtitle: "Aenean varius mi accumsan imperdiet tincidunt<br/>turpis velit scelerisque eros quis felis",
        icon: DefaultIconSet.FaceID,
        onConfirm: () => { alert("Lorem ipsum dolor sit amet"); }
    },
    render: args => <DialogWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};
