import {Props as SpacerProps, Variant} from "@miniskylab/antimatter-spacer";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<SpacerProps, {
    readonly variant?: keyof typeof Variant;
}>;
