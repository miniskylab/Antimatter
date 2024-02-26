import {useEffect, useState} from "react";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {isEnvironment} from "../functions";
import {ssrIsEnabled} from "./responsive";
import {useTypography} from "./typography";

export function useSuspense(): ViewStyle & TextStyle & ImageStyle
{
    const [componentDidMount, setComponentDidMount] = useState(false);
    useEffect(() => { setComponentDidMount(true); }, []);

    if (ssrIsEnabled())
    {
        const typographyLoaded = !!useTypography();
        return componentDidMount && typographyLoaded
            ? {}
            : {display: "none"};
    }

    return isEnvironment("NativeApp") || isEnvironment("WebBrowser")
        ? {}
        : {display: "none"};
}
