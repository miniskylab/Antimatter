import {Description, Title} from "@storybook/blocks";
import React, {FunctionComponent, JSX} from "react";
import {Text, View} from "react-native";
import {Reflection} from "../../../consts";
import {ComponentName} from "../../../decorators";
import * as Styles from "./styles";

type Props = { of: FunctionComponent; propsType: unknown; supportedPlatforms: ("iOS" | "Android" | "Web")[] }
export function Intro({
    of,
    propsType,
    supportedPlatforms = []
}: Props): JSX.Element
{
    return (
        <View style={Styles.Root}>
            <Title>{Reflection.getDecoratorValue<string>(ComponentName, propsType)}</Title>
            {supportedPlatforms.length > 0 && <View style={Styles.BadgeContainer}>
                <Text style={Styles.BadgeDescription}>Supported Platforms</Text>
                {supportedPlatforms.includes("iOS") && <Text style={Styles.BadgeValueIOS}>iOS</Text>}
                {supportedPlatforms.includes("Android") && <Text style={Styles.BadgeValueAndroid}>Android</Text>}
                {supportedPlatforms.includes("Web") && <Text style={Styles.BadgeValueWeb}>Web</Text>}
            </View>}
            {<Description of={of}/>}
        </View>
    );
}
