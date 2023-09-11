import {useFonts} from "expo-font";
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
    const [fontsLoaded] = useFonts({
        "Roboto-Black": RobotoBlack,
        "Roboto-Black-Italic": RobotoBlackItalic,
        "Roboto-Bold": RobotoBold,
        "Roboto-Bold-Italic": RobotoBoldItalic,
        "Roboto-Regular-Italic": RobotoRegularItalic,
        "Roboto-Light": RobotoLight,
        "Roboto-Light-Italic": RobotoLightItalic,
        "Roboto-Medium": RobotoMedium,
        "Roboto-Medium-Italic": RobotoMediumItalic,
        "Roboto-Regular": RobotoRegular,
        "Roboto-Thin": RobotoThin,
        "Roboto-Thin-Italic": RobotoThinItalic
    });

    return fontsLoaded;
}
