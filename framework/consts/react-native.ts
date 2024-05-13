import {CursorValue} from "react-native";
import {isEnvironment} from "../functions";

const isWebEnvironment = isEnvironment("Web");
const antimatterCursorType = {
    Auto: "auto",
    Pointer: "pointer",
    Default: isWebEnvironment ? "default" : "auto",
    NotAllowed: isWebEnvironment ? "not-allowed" : "auto"
};

export const CursorType = antimatterCursorType as Record<keyof typeof antimatterCursorType, CursorValue>;
