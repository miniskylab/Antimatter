import {addEventListener} from "@react-native-community/netinfo";
import {InternetStateInfo} from "../types";

export function onInternetStateChange(internetStateChangeHandler: (internetStateInfo: InternetStateInfo) => void): void
{
    addEventListener(internetStateChangeHandler);
}
