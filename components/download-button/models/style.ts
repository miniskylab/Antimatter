import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {DownloadButtonProps} from "./props";
import {DownloadButtonState} from "./state";

export type DownloadButtonStyle = (
    downloadButtonProps: WithoutStyle<DownloadButtonProps>,
    downloadButtonState: DownloadButtonState
) => ButtonStyle;
