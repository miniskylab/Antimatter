import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as ImageMatrixProps, Variant} from "@miniskylab/antimatter-image-matrix";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class ImageMatrixDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<ImageMatrixProps>
    {
        return ImageMatrixProps;
    }

    protected deserialize(serializedProps: SerializedProps): ImageMatrixProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
