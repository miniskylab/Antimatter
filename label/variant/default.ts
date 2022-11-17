import {Platform} from "react-native";
import {LabelStyles} from "../model";

export const Default: LabelStyles = {
    Root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: Platform.OS === "web" ? "Roboto, sans-serif" : undefined
    }
};
