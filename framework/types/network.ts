import {NetInfoState} from "@react-native-community/netinfo";

export type InternetStateInfo = {
    readonly isInternetReachable: NetInfoState["isInternetReachable"];
}
