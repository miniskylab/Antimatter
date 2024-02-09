import {Typeset} from "@storybook/blocks";
import type {Meta} from "@storybook/react";
import React, {JSX} from "react";
import {Text} from "react-native";
import {useTypography} from "../index";

export default {title: "Typography", tags: ["hidden-from-sidebar"]} satisfies Meta;
export function RobotoTypeset(): JSX.Element
{
    return (
        <Text style={{color: "#FFFFFF"}}>
            <Typeset
                fontFamily={useTypography()?.fontFamily}
                sampleText={"The quick brown fox jumps over the lazy dog"}
                fontSizes={["12px", "14px", "16px", "20px", "24px", "32px", "40px", "48px"]}
                fontWeight={400}
            />
        </Text>
    );
}
