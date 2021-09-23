import {IconName} from "@miniskylab/antimatter/icon";
import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultTimelineVariant, TimelineVariant} from "../variants";
import {TimelineComponentProps} from "./timeline-component-props";
import {TimelineExportProps} from "./timeline-export-props";

export class TimelineExporter extends ComponentExporter<TimelineExportProps>
{
    protected get PropsType(): ClassConstructor<TimelineComponentProps>
    {
        return TimelineComponentProps;
    }

    protected get DefaultProps(): Partial<TimelineComponentProps>
    {
        return {
            events: [],
            bootstrapEvent: undefined
        };
    }

    protected deserialize(timelineExportProps: TimelineExportProps): TimelineExportProps
    {
        return {
            ...timelineExportProps,
            bootstrapEvent: {
                ...timelineExportProps.bootstrapEvent,
                icon: Enum.getValue(IconName, timelineExportProps.bootstrapEvent.icon)
            }
        };
    }

    protected getVariant(timelineExportProps: TimelineExportProps): CSS
    {
        switch (Enum.getValue(TimelineVariant, timelineExportProps.variant))
        {
            case null:
            case undefined:
            case TimelineVariant.Default:
                return DefaultTimelineVariant;

            default:
                return timelineExportProps.variant as CSS;
        }
    }
}
