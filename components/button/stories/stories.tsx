import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Button} from "../main";
import {ButtonProps} from "../models";
import * as Variant from "./variants";

export default {component: Button, title: "Components/Button"} satisfies Meta<typeof Button>;
type Story = StoryObj<typeof Button>;

const ButtonWithValidation = withValidation(Button, ButtonProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        icon: Sb.enumDropdown(DefaultIconSet),
        label: Sb.text(),
        disabled: Sb.boolean(),
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
    tags: ["hidden-from-sidebar"],
    render: () => (
        <>
            <Button
                icon={DefaultIconSet.Sun}
                label={"Blue"}
                style={Variant.SolidRectangular}
                onPress={() => alert("Blue")}
            />
            <Button
                label={"Green"}
                style={Variant.SolidRectangularGreen}
                onPress={() => alert("Green")}
            />
            <Button
                label={"Cta button"}
                icon={DefaultIconSet.ChevronRight}
                style={Variant.SolidRectangularGold}
                onPress={() => alert("Cta")}
            />
            <Button
                label={"Tomato"}
                icon={DefaultIconSet.NoMic}
                style={Variant.OutlinedRectangularTomato}
                onPress={() => alert("Tomato")}
            />
            <Button
                icon={DefaultIconSet.Location}
                style={Variant.OutlinedCircularCoral}
                onPress={() => alert("Circular")}
            />
        </>
    )
};

export const Size: Story = {
    tags: ["hidden-from-sidebar"],
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
    tags: ["hidden-from-sidebar"],
    render: () => (
        <>
            <Button
                label={"Blue"}
                icon={DefaultIconSet.Sun}
                style={Variant.SolidRectangular}
                disabled={true}
            />
            <Button
                label={"Blue"}
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
