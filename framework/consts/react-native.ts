import {CursorValue, Platform} from "react-native";

const isWebEnvironment = Platform.OS === "web";
const antimatterCursorType = {
    Auto: "auto",
    Pointer: "pointer",
    Text: isWebEnvironment ? "text" : "auto",
    Default: isWebEnvironment ? "default" : "auto",
    NotAllowed: isWebEnvironment ? "not-allowed" : "auto"
};

export const CursorType = antimatterCursorType as Record<keyof typeof antimatterCursorType, CursorValue>;
