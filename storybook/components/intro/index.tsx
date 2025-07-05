import {ComponentName, Reflection} from "@miniskylab/antimatter-framework";
import {Description, Title} from "@storybook/addon-docs/blocks";
import React, {FunctionComponent, JSX} from "react";
import {Text, View} from "react-native";
import * as Styles from "./styles";

export function Intro({
    of,
    propsType,
    supportedPlatforms = []
}: {
    readonly of?: FunctionComponent;
    readonly propsType?: unknown;
    readonly supportedPlatforms: ("iOS" | "Android" | "Web")[]
}): JSX.Element
{
    return (
        <View style={Styles.Root}>
            {!!propsType && <Title>{Reflection.getDecoratorValue<string>(ComponentName, propsType)}</Title>}
            {supportedPlatforms.length > 0 && <View style={Styles.BadgeContainer}>
                <Text style={Styles.BadgeDescription}>Supported Platforms</Text>
                {supportedPlatforms.includes("iOS") && <Text style={Styles.BadgeValueIOS}>iOS</Text>}
                {supportedPlatforms.includes("Android") && <Text style={Styles.BadgeValueAndroid}>Android</Text>}
                {supportedPlatforms.includes("Web") && <Text style={Styles.BadgeValueWeb}>Web</Text>}
            </View>}
            {!!of && <Description of={of}/>}
        </View>
    );
}
