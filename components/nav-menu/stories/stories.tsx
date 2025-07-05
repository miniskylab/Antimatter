import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {useArgs} from "storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {NavMenu} from "../main";
import {NavMenuProps} from "../models";
import {TestData} from "./test-data";
import * as Variant from "./variants";

export default {component: NavMenu, title: "Components/Navigation Menu"} satisfies Meta<typeof NavMenu>;
type Story = StoryObj<typeof NavMenu>;

const NavMenuWithValidation = withValidation(NavMenu, NavMenuProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        selectedUrl: Sb.locked,
        categories: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.FixedWidth),
        selectedUrl: TestData.SelectedUrl,
        categories: TestData.Categories
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
