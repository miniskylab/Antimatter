import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Styled} from "@miniskylab/antimatter-framework";
import {DownloadButtonProps} from "./props";
import {DownloadButtonState} from "./state";

export type DownloadButtonStyle = (
    downloadButtonProps: Styled<DownloadButtonProps>,
    downloadButtonState: DownloadButtonState
) => ButtonStyle;
