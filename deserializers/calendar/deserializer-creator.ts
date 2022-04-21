import {HeaderVariant, Props as CalendarProps, Variant as CalendarVariant} from "@miniskylab/antimatter-calendar";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class CalendarDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<CalendarProps>
    {
        return CalendarProps;
    }

    protected deserialize(serializedProps: SerializedProps): CalendarProps
    {
        return {
            ...serializedProps,
            variant: CalendarVariant[serializedProps.variant],
            componentVariant: {
                header: HeaderVariant[serializedProps.componentVariant.header],
                dateView: HeaderVariant[serializedProps.componentVariant.dateView],
                monthView: HeaderVariant[serializedProps.componentVariant.monthView],
                yearView: HeaderVariant[serializedProps.componentVariant.yearView],
                controls: HeaderVariant[serializedProps.componentVariant.controls]
            },
            selectedDate: Date.deserialize(serializedProps.selectedDate)
        };
    }
}
