import {Platform, StyleSheet, TextStyle} from "react-native";
import {ComponentProps} from "./component-props";

export type ElementStyle = StyleSheet.NamedStyles<Record<string, unknown>>[string];
export type OmitStyle<TProps extends ComponentProps<TProps["style"]>> = Required<Omit<TProps, "style">>;

export function inheritTextStyleFrom<TStyle extends TextStyle>(style: TStyle): TextStyle
{
    return {
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontSize: style.fontSize,
        fontStyle: style.fontStyle,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        textDecorationLine: style.textDecorationLine,
        textDecorationStyle: style.textDecorationStyle
    };
}

export function getFontFamily<TStyle extends TextStyle>(style: TStyle): string
{
    const fontName = "Roboto";
    if (Platform.OS === "web")
    {
        return fontName;
    }

    let fontStyle;
    switch (style.fontStyle)
    {
        case "italic":
            fontStyle = "-Italic";
            break;

        case "normal":
        default:
            fontStyle = "";
            break;
    }

    let fontWeight;
    switch (style.fontWeight)
    {
        case "100":
        case "200":
            fontWeight = "-Thin";
            break;

        case "300":
            fontWeight = "-Light";
            break;

        case "400":
            fontWeight = "-Regular";
            break;

        case "500":
        case "600":
            fontWeight = "-Medium";
            break;

        case "bold":
        case "700":
        case "800":
            fontWeight = "-Bold";
            break;

        case "900":
            fontWeight = "-Black";
            break;

        case "normal":
        default:
            fontWeight = "-Regular";
            break;
    }

    return `${fontName}${fontWeight}${fontStyle}`;
}
