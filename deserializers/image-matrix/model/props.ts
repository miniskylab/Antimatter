import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as ImageMatrixProps, Variant} from "@miniskylab/antimatter-image-matrix";

export type Props = SerializedProps<ImageMatrixProps, {
    readonly variant?: keyof typeof Variant;
}>;
