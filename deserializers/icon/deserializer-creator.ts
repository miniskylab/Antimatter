import {IconName, Props as IconProps, Variant} from "@miniskylab/antimatter-icon";
import {Enum} from "@miniskylab/antimatter-typescript";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class IconDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<IconProps>
    {
        return IconProps;
    }

    protected deserialize(serializedProps: SerializedProps): IconProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant],
            iconName: Enum.getValue(IconName, serializedProps.iconName)
        };
    }
}
