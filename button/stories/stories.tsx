import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Button} from "../main";
import {ButtonProps} from "../models";
import * as Variant from "./variants";

const ButtonWithValidation = withValidation(Button, ButtonProps);
export default {
    component: Button,
    title: "Components/Button",
    parameters: {status: {type: [Sb.Badge.IOS, Sb.Badge.Web]}}
} satisfies Meta<typeof Button>;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        icon: Sb.enumDropdown(DefaultIconSet),
        onPress: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.SolidRectangular),
        icon: DefaultIconSet.Sun,
        label: "Press me",
        disabled: false,
        onPress: () => alert("Thanks for pressing me!")
    },
    render: args => <ButtonWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

export const Styles: Story = {
    render: () => (
        <>
            <Button
                icon={DefaultIconSet.Sun}
                label={"Primary"}
                style={Variant.SolidRectangular}
                onPress={() => alert("Primary")}
            />
            <Button
                label={"Positive"}
                style={Variant.SolidRectangularPositive}
                onPress={() => alert("Positive")}
            />
            <Button
                label={"Cta button"}
                icon={DefaultIconSet.ChevronRight}
                style={Variant.SolidRectangularWarning}
                onPress={() => alert("Cta")}
            />
            <Button
                label={"Negative"}
                icon={DefaultIconSet.NoMic}
                style={Variant.OutlinedRectangularNegative}
                onPress={() => alert("Negative")}
            />
            <Button
                icon={DefaultIconSet.Location}
                style={Variant.OutlinedCircularComplementary}
                onPress={() => alert("Circular")}
            />
        </>
    )
};

export const Size: Story = {
    render: () => (
        <>
            <Button
                label={"Default"}
                style={Variant.SolidRectangular}
                onPress={() => alert("Default")}
            />
            <Button
                label={"Large Button"}
                style={Variant.SolidRectangularLarge}
                onPress={() => alert("Large")}
            />
            <Button
                icon={DefaultIconSet.Sun}
                label={"Gigantic Button"}
                style={Variant.SolidRectangularGigantic}
                onPress={() => alert("Gigantic")}
            />
            <Button
                icon={DefaultIconSet.Sun}
                style={Variant.OutlinedCircularGigantic}
                onPress={() => alert("Circular Gigantic")}
            />
            <Button
                icon={DefaultIconSet.Sun}
                style={Variant.OutlinedCircularLarge}
                onPress={() => alert("Circular Large")}
            />
            <Button
                icon={DefaultIconSet.Sun}
                style={Variant.OutlinedCircular}
                onPress={() => alert("Circular Default")}
            />
        </>
    )
};

export const Disabled: Story = {
    render: () => (
        <>
            <Button
                label={"Primary"}
                icon={DefaultIconSet.Sun}
                style={Variant.SolidRectangular}
                disabled={true}
            />
            <Button
                label={"Primary"}
                style={Variant.OutlinedRectangular}
                disabled={true}
            />
            <Button
                icon={DefaultIconSet.Sun}
                style={Variant.OutlinedCircular}
                disabled={true}
            />
        </>
    )
};
