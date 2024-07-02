import {create} from "@storybook/theming";

export const theme = {
    dark: create({
        base: "dark",
        brandImage: "logo.png",
        brandTitle: "Antimatter",
        brandUrl: "/storybook",
        brandTarget: "_self"
    })
};
