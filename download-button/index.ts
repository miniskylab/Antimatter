import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructures";
import {DownloadButtonComponentProps} from "./models/download-button-component-props";

export const DownloadButtonComponentName = Decorator.getValue(ComponentName, DownloadButtonComponentProps) as string;

export {DownloadButtonComponentProps};

export {
    ButtonVariant as DownloadButtonVariant,
    ButtonTarget as DownloadButtonTarget
} from "@miniskylab/antimatter/button";

export {
    DownloadButtonComponent,
    DownloadButtonComponent as DownloadButton
} from "./download-button-component";
