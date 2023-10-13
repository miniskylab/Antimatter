import {Description, Title} from "@storybook/blocks";
import React, {FunctionComponent, JSX} from "react";
import {View} from "react-native";
import {ComponentName, Decorator} from "../../reflection";

type Props = { of: FunctionComponent; propsType: unknown; }
export function Intro({of, propsType}: Props): JSX.Element
{
    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Title>{Decorator.getValue<string>(ComponentName, propsType)}</Title>
            {<Description of={of}/>}
        </View>
    );
}
