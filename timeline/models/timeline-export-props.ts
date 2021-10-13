import {IconName} from "@miniskylab/antimatter/icon";
import {Export, Modify} from "@miniskylab/antimatter/infrastructure";
import {TimelineVariant} from "../variants";
import {TimelineBootstrapEvent} from "./timeline-bootstrap-event";
import {TimelineComponentProps} from "./timeline-component-props";

export type TimelineExportProps = Export<TimelineComponentProps, TimelineVariant, {
    readonly bootstrapEvent?: Modify<TimelineBootstrapEvent, {
        readonly icon: IconName | string;
    }>;
}>;
