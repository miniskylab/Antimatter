import {Props as HighlightedParagraphProps, Variant} from "@miniskylab/antimatter-highlighted-paragraph";
import {IconName} from "@miniskylab/antimatter-icon";
import {Enum} from "@miniskylab/antimatter-typescript";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class HighlightedParagraphDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<HighlightedParagraphProps>
    {
        return HighlightedParagraphProps;
    }

    protected deserialize(serializedProps: SerializedProps): HighlightedParagraphProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant],
            icon: Enum.getValue(IconName, serializedProps.icon)
        };
    }
}
