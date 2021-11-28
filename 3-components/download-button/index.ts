import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {DownloadButtonComponentProps} from "./models/download-button-component-props";

export const DownloadButtonComponentName = Decorator.getValue<string>(ComponentName, DownloadButtonComponentProps);

export {DownloadButtonComponentProps};

export {
    ButtonVariant as DownloadButtonVariant,
    ButtonTarget as DownloadButtonTarget
} from "@miniskylab/antimatter-button";

export {
    DownloadButtonComponent,
    DownloadButtonComponent as DownloadButton
} from "./download-button-component";
