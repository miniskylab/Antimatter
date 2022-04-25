import {Props as DataTableProps, Variant} from "@miniskylab/antimatter-data-table";
import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class DataTableDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<DataTableProps>
    {
        return DataTableProps;
    }

    protected deserialize(serializedProps: SerializedProps): DataTableProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
