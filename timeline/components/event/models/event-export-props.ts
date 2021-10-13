import {TimeUnit} from "@miniskylab/antimatter/date-time";
import {IconName} from "@miniskylab/antimatter/icon";
import {Export} from "@miniskylab/antimatter/infrastructure";
import {EventVariant} from "../variants";
import {EventComponentProps} from "./event-component-props";
import {EventPosition} from "./event-position";

export type EventExportProps = Export<EventComponentProps, EventVariant, {
    readonly position?: EventPosition | string;
    readonly icon: IconName | string;
    readonly startDate: Date | string;
    readonly endDate?: Date | string;
    readonly minimumTimeUnit?: TimeUnit | string;
}>;
