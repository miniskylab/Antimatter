import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const FileRowContext = createContext<FileRowContext>(undefined);
export type FileRowContext = ComponentContext<Props>;
