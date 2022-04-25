import {Props as DatePickerProps, Variant} from "@miniskylab/antimatter-date-picker";
import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class DatePickerDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<DatePickerProps>
    {
        return DatePickerProps;
    }

    protected deserialize(serializedProps: SerializedProps): DatePickerProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant],
            defaultSelectedDate: Date.deserialize(serializedProps.defaultSelectedDate)
        };
    }
}
