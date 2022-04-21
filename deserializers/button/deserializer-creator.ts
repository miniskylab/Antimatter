import {Props as ButtonProps, Target, Variant} from "@miniskylab/antimatter-button";
import {IconName} from "@miniskylab/antimatter-icon";
import {Enum} from "@miniskylab/antimatter-typescript";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class ButtonDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<ButtonProps>
    {
        return ButtonProps;
    }

    protected deserialize(serializedProps: SerializedProps): ButtonProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant],
            icon: Enum.getValue(IconName, serializedProps.icon),
            target: Enum.getValue(Target, serializedProps.target)
        };
    }
}
