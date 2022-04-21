import {IconName} from "@miniskylab/antimatter-icon";
import {Props as TimelineProps, Variant} from "@miniskylab/antimatter-timeline";
import {Enum} from "@miniskylab/antimatter-typescript";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class TimelineDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<TimelineProps>
    {
        return TimelineProps;
    }

    protected deserialize(serializedProps: SerializedProps): TimelineProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant],
            bootstrapEvent: serializedProps.bootstrapEvent
                ? {
                    ...serializedProps.bootstrapEvent,
                    icon: Enum.getValue(IconName, serializedProps.bootstrapEvent.icon)
                }
                : undefined
        };
    }
}
