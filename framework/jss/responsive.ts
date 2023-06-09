import "@expo/match-media";
import {useMediaQuery} from "react-responsive";

export function useScreenSize(screenSize: ScreenSize)
{
    return useMediaQuery({minWidth: screenSize});
}

export enum ScreenSize
{
    Small = 576,
    Medium = 769,
    Large = 1025,
    ExtraLarge = 1200
}
