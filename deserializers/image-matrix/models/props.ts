import {Props as ImageMatrixProps, Variant} from "@miniskylab/antimatter-image-matrix";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<ImageMatrixProps, {
    readonly variant?: keyof typeof Variant;
}>;
