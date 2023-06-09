import {TextStyle} from "react-native";
import {EMPTY_STRING} from "../data-type";
import {Environment, useEnvironment} from "../jss";
import {ComponentProps} from "./component-props";

export type Styled<TProps extends ComponentProps<TProps["style"]>> = Required<Omit<TProps, "style">>;

export function inheritTextStyleFrom<TStyle extends TextStyle>(style: TStyle): TextStyle
{
    return {
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontSize: style.fontSize,
        fontStyle: style.fontStyle,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        textAlign: style.textAlign,
        textDecorationLine: style.textDecorationLine,
        textDecorationStyle: style.textDecorationStyle
    };
}

export function getFontFamily<TStyle extends TextStyle>(style: TStyle): string
{
    const fontName = "Roboto";
    const runningOnWeb = useEnvironment(Environment.Web);
    if (runningOnWeb)
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
            fontStyle = EMPTY_STRING;
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
