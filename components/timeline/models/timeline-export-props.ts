import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {IconName} from "@miniskylab/antimatter-icon";
import {Modify} from "@miniskylab/antimatter-typescript";
import {TimelineVariant} from "../variants";
import {TimelineBootstrapEvent} from "./timeline-bootstrap-event";
import {TimelineComponentProps} from "./timeline-component-props";

export type TimelineExportProps = ComponentExportProps<TimelineComponentProps, TimelineVariant, {
    readonly bootstrapEvent?: Modify<TimelineBootstrapEvent, {
        readonly icon: IconName | string;
    }>;
}>;
