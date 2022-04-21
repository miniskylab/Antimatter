import {Props as DropdownMenuProps, Variant} from "@miniskylab/antimatter-dropdown-menu";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class DropdownMenuDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<DropdownMenuProps>
    {
        return DropdownMenuProps;
    }

    protected deserialize(serializedProps: SerializedProps): DropdownMenuProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
