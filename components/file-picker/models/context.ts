import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {FilePickerProps} from "./props";

export const FilePickerContext = createContext<FilePickerContext>(undefined);
export type FilePickerContext = ComponentContext<FilePickerProps>;
