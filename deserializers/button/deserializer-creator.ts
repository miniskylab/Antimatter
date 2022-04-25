import {Props as ButtonProps, Target, Variant} from "@miniskylab/antimatter-button";
import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {IconName} from "@miniskylab/antimatter-icon";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

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
            variant: Variant.Value[serializedProps.variant],
            icon: Enum.getValue(IconName, serializedProps.icon),
            target: Enum.getValue(Target, serializedProps.target)
        };
    }
}
