import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {IconName} from "@miniskylab/antimatter-icon";
import {TimeUnit} from "@miniskylab/antimatter-typescript";
import {EventVariant} from "../variants";
import {EventComponentProps} from "./event-component-props";
import {EventPosition} from "./event-position";

export type EventExportProps = ComponentExportProps<EventComponentProps, EventVariant, {
    readonly position?: EventPosition | string;
    readonly icon: IconName | string;
    readonly startDate: Date | string;
    readonly endDate?: Date | string;
    readonly minimumTimeUnit?: TimeUnit | string;
}>;
