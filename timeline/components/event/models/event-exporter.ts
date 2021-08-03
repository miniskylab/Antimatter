import {TimeUnit} from "antimatter/date-time";
import {IconName} from "antimatter/icon";
import {ComponentExporter, CSS, Enum} from "antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultEventVariant, EventVariant} from "../variants";
import {EventComponentProps} from "./event-component-props";
import {EventExportProps} from "./event-export-props";
import {EventPosition} from "./event-position";

export class EventExporter extends ComponentExporter<EventExportProps>
{
    protected get PropsType(): ClassConstructor<EventComponentProps>
    {
        return EventComponentProps;
    }

    protected get DefaultProps(): Partial<EventComponentProps>
    {
        return {
            position: undefined,
            image: undefined,
            description: String.EMPTY,
            endDate: undefined,
            isOnGoing: false,
            location: String.EMPTY,
            minimumTimeUnit: TimeUnit.Month
        };
    }

    protected deserialize(eventExportProps: EventExportProps): EventExportProps
    {
        return {
            ...eventExportProps,
            position: Enum.getValue(EventPosition, eventExportProps.position),
            icon: Enum.getValue(IconName, eventExportProps.icon),
            startDate: Date.deserialize(eventExportProps.startDate),
            endDate: Date.deserialize(eventExportProps.endDate),
            minimumTimeUnit: Enum.getValue(TimeUnit, eventExportProps.minimumTimeUnit)
        };
    }

    protected getVariant(eventExportProps: EventExportProps): CSS
    {
        switch (Enum.getValue(EventVariant, eventExportProps.variant))
        {
            case null:
            case undefined:
            case EventVariant.Default:
                return DefaultEventVariant;

            default:
                return eventExportProps.variant as CSS;
        }
    }
}
