import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DownloadButtonProps} from "./props";
import {DownloadButtonState} from "./state";

export const DownloadButtonContext = createContext<DownloadButtonContext>({});
export type DownloadButtonContext = ComponentContext<DownloadButtonProps, DownloadButtonState>;
