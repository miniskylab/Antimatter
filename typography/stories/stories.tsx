import {Typeset} from "@storybook/addon-docs/blocks";
import type {Meta} from "@storybook/react";
import {useFonts} from "expo-font";
import React, {JSX} from "react";
import {Text} from "react-native";
import {Roboto} from "../fonts";

export default {tags: ["hidden-from-sidebar"]} satisfies Meta;
export function RobotoTypeset(): JSX.Element
{
    useFonts(Roboto);
    return (
        <Text style={{color: "#FFFFFF"}}>
            <Typeset
                fontFamily={"Roboto-Regular"}
                sampleText={"The quick brown fox jumps over the lazy dog"}
                fontSizes={["12px", "14px", "16px", "20px", "24px", "32px", "40px", "48px"]}
                fontWeight={400}
            />
        </Text>
    );
}
