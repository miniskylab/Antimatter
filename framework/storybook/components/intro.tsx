import {Description, Title} from "@storybook/blocks";
import React, {ComponentType, JSX} from "react";
import {View} from "react-native";

type Props = { title: string; component?: ComponentType }
export function Intro({title, component}: Props): JSX.Element
{
    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Title>{title}</Title>
            {component && <Description of={component}/>}
        </View>
    );
}
