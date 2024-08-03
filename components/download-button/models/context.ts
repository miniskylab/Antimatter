import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DownloadButtonProps} from "./props";
import {type DownloadButtonState} from "./state";

export const DownloadButtonContext = createContext<DownloadButtonContext>(undefined);
export type DownloadButtonContext = ComponentContext<DownloadButtonProps, DownloadButtonState>;
