import {FontDisplay} from "expo-font";
import {useCustomFonts} from "../../hooks";
import RobotoBlackItalic from "./Roboto-Black-Italic.ttf";
import RobotoBlack from "./Roboto-Black.ttf";
import RobotoBoldItalic from "./Roboto-Bold-Italic.ttf";
import RobotoBold from "./Roboto-Bold.ttf";
import RobotoLightItalic from "./Roboto-Light-Italic.ttf";
import RobotoLight from "./Roboto-Light.ttf";
import RobotoMediumItalic from "./Roboto-Medium-Italic.ttf";
import RobotoMedium from "./Roboto-Medium.ttf";
import RobotoRegularItalic from "./Roboto-Regular-Italic.ttf";
import RobotoRegular from "./Roboto-Regular.ttf";
import RobotoThinItalic from "./Roboto-Thin-Italic.ttf";
import RobotoThin from "./Roboto-Thin.ttf";

export function useRobotoFont(): boolean
{
    const display = FontDisplay.FALLBACK;
    const [fontsLoaded] = useCustomFonts({
        "Roboto-Black": {uri: RobotoBlack, display},
        "Roboto-Black-Italic": {uri: RobotoBlackItalic, display},
        "Roboto-Bold": {uri: RobotoBold, display},
        "Roboto-Bold-Italic": {uri: RobotoBoldItalic, display},
        "Roboto-Regular-Italic": {uri: RobotoRegularItalic, display},
        "Roboto-Light": {uri: RobotoLight, display},
        "Roboto-Light-Italic": {uri: RobotoLightItalic, display},
        "Roboto-Medium": {uri: RobotoMedium, display},
        "Roboto-Medium-Italic": {uri: RobotoMediumItalic, display},
        "Roboto-Regular": {uri: RobotoRegular, display},
        "Roboto-Thin": {uri: RobotoThin, display},
        "Roboto-Thin-Italic": {uri: RobotoThinItalic, display}
    });

    return fontsLoaded;
}
