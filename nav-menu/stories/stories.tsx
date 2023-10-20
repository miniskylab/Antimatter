import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {NavMenu} from "../main";
import {NavMenuProps} from "../models";
import {TestData} from "./test-data";
import * as Variant from "./variants";

const NavMenuWithValidation = withValidation(NavMenu, NavMenuProps);
export default {
    component: NavMenu,
    title: "Components/Navigation Menu"
} satisfies Meta<typeof NavMenu>;
type Story = StoryObj<typeof NavMenu>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        selectedUrl: Sb.locked,
        categories: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.FixedWidth),
        selectedUrl: TestData.selectedUrl,
        categories: TestData.categories
    },
    render: args =>
    {
        const [, setArgs] = useArgs<NavMenuProps>();
        return (
            <NavMenuWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onMenuItemPress={targetUrl => { setArgs({selectedUrl: targetUrl}); }}
            />
        );
    }
};
