import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {HighlightedParagraph} from "../main";
import {HighlightedParagraphProps} from "../models";
import * as Variant from "./variants";

const HighlightedParagraphWithValidation = withValidation(HighlightedParagraph, HighlightedParagraphProps);
export default {
    component: HighlightedParagraph,
    title: "Components/Highlighted Paragraph"
} satisfies Meta<typeof HighlightedParagraph>;
type Story = StoryObj<typeof HighlightedParagraph>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        icon: Sb.enumDropdown(DefaultIconSet)
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        icon: DefaultIconSet.Sun,
        title: "Lorem ipsum",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec urna rhoncus neque rutrum rhoncus in quis metus. " +
                 "Integer laoreet augue nec purus hendrerit, vel hendrerit ligula pretium. Pellentesque habitant morbi tristique " +
                 "senectus et netus et malesuada fames ac turpis egestas. Morbi facilisis at ex eu rutrum. Nulla eu tortor at erat " +
                 "tincidunt fermentum ut nec eros. Vestibulum volutpat facilisis gravida. Aenean commodo egestas felis et ultrices. " +
                 "Maecenas at ipsum pellentesque, iaculis purus ut, eleifend dui. Donec laoreet, orci in condimentum pellentesque, " +
                 "sem risus pharetra tellus, sed blandit tortor neque sed tellus. Donec convallis odio id ex venenatis, nec porta tortor " +
                 "pharetra. Donec feugiat dictum metus, eget efficitur purus lacinia quis. Quisque auctor libero at quam pharetra, nec " +
                 "condimentum nunc fermentum. Nulla a felis gravida, faucibus felis ut, tristique dolor. Aliquam tincidunt eget sem nec " +
                 "pellentesque. Sed et quam magna."
    },
    render: args => <HighlightedParagraphWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

export const ShortMessage: Story = {
    render: () => (
        <>
            <HighlightedParagraph style={Variant.Info} title={"This is information."}/>
            <HighlightedParagraph style={Variant.Warning} icon={DefaultIconSet.Warning} title={"This is a warning!"}/>
            <HighlightedParagraph style={Variant.Error} icon={DefaultIconSet.XMark} title={"This is an error."}/>
            <HighlightedParagraph style={Variant.Note} icon={DefaultIconSet.Pen} title={"This is a note."}/>
        </>
    )
};

export const Paragraph: Story = {
    render: () => (
        <>
            <HighlightedParagraph
                style={Variant.Info}
                content={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec urna rhoncus neque rutrum rhoncus in quis metus. " +
                    "Integer laoreet augue nec purus hendrerit, vel hendrerit ligula pretium. Pellentesque habitant morbi tristique " +
                    "senectus et netus et malesuada fames ac turpis egestas. Morbi facilisis at ex eu rutrum. Nulla eu tortor at erat " +
                    "tincidunt fermentum ut nec eros. Vestibulum volutpat facilisis gravida. Aenean commodo egestas felis et ultrices. " +
                    "Maecenas at ipsum pellentesque, iaculis purus ut, eleifend dui. Donec laoreet, orci in condimentum pellentesque, " +
                    "sem risus pharetra tellus, sed blandit tortor neque sed tellus. Donec convallis odio id ex venenatis, nec porta " +
                    "tortor pharetra. Donec feugiat dictum metus, eget efficitur purus lacinia quis. Quisque auctor libero at quam " +
                    "pharetra, nec condimentum nunc fermentum. Nulla a felis gravida, faucibus felis ut, tristique dolor. Aliquam " +
                    "tincidunt eget sem nec pellentesque. Sed et quam magna."
                }
            />
            <HighlightedParagraph
                style={Variant.Warning}
                title={"Warning"}
                content={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec urna rhoncus neque rutrum rhoncus in quis metus. " +
                    "Integer laoreet augue nec purus hendrerit, vel hendrerit ligula pretium. Pellentesque habitant morbi tristique " +
                    "senectus et netus et malesuada fames ac turpis egestas. Morbi facilisis at ex eu rutrum. Nulla eu tortor at erat " +
                    "tincidunt fermentum ut nec eros. Vestibulum volutpat facilisis gravida. Aenean commodo egestas felis et ultrices. " +
                    "Maecenas at ipsum pellentesque, iaculis purus ut, eleifend dui. Donec laoreet, orci in condimentum pellentesque, " +
                    "sem risus pharetra tellus, sed blandit tortor neque sed tellus. Donec convallis odio id ex venenatis, nec porta " +
                    "tortor pharetra. Donec feugiat dictum metus, eget efficitur purus lacinia quis. Quisque auctor libero at quam " +
                    "pharetra, nec condimentum nunc fermentum. Nulla a felis gravida, faucibus felis ut, tristique dolor. Aliquam " +
                    "tincidunt eget sem nec pellentesque. Sed et quam magna."
                }
            />
            <HighlightedParagraph
                style={Variant.Error}
                icon={DefaultIconSet.XMark}
                title={"Error"}
                content={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec urna rhoncus neque rutrum rhoncus in quis metus. " +
                    "Integer laoreet augue nec purus hendrerit, vel hendrerit ligula pretium. Pellentesque habitant morbi tristique " +
                    "senectus et netus et malesuada fames ac turpis egestas. Morbi facilisis at ex eu rutrum. Nulla eu tortor at erat " +
                    "tincidunt fermentum ut nec eros. Vestibulum volutpat facilisis gravida. Aenean commodo egestas felis et ultrices. " +
                    "Maecenas at ipsum pellentesque, iaculis purus ut, eleifend dui. Donec laoreet, orci in condimentum pellentesque, " +
                    "sem risus pharetra tellus, sed blandit tortor neque sed tellus. Donec convallis odio id ex venenatis, nec porta " +
                    "tortor pharetra. Donec feugiat dictum metus, eget efficitur purus lacinia quis. Quisque auctor libero at quam " +
                    "pharetra, nec condimentum nunc fermentum. Nulla a felis gravida, faucibus felis ut, tristique dolor. Aliquam " +
                    "tincidunt eget sem nec pellentesque. Sed et quam magna."
                }
            />
            <HighlightedParagraph
                style={Variant.Note}
                icon={DefaultIconSet.Pen}
                title={"Note"}
                content={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec urna rhoncus neque rutrum rhoncus in quis metus. " +
                    "Integer laoreet augue nec purus hendrerit, vel hendrerit ligula pretium. Pellentesque habitant morbi tristique " +
                    "senectus et netus et malesuada fames ac turpis egestas. Morbi facilisis at ex eu rutrum. Nulla eu tortor at erat " +
                    "tincidunt fermentum ut nec eros. Vestibulum volutpat facilisis gravida. Aenean commodo egestas felis et ultrices. " +
                    "Maecenas at ipsum pellentesque, iaculis purus ut, eleifend dui. Donec laoreet, orci in condimentum pellentesque, " +
                    "sem risus pharetra tellus, sed blandit tortor neque sed tellus. Donec convallis odio id ex venenatis, nec porta " +
                    "tortor pharetra. Donec feugiat dictum metus, eget efficitur purus lacinia quis. Quisque auctor libero at quam " +
                    "pharetra, nec condimentum nunc fermentum. Nulla a felis gravida, faucibus felis ut, tristique dolor. Aliquam " +
                    "tincidunt eget sem nec pellentesque. Sed et quam magna."
                }
            />
        </>
    )
};
