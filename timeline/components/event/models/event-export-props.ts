import {TimeUnit} from "antimatter/date-time";
import {IconName} from "antimatter/icon";
import {Export} from "antimatter/infrastructures";
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
