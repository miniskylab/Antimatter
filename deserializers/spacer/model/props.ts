import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as SpacerProps, Variant} from "@miniskylab/antimatter-spacer";

export type Props = SerializedProps<SpacerProps, {
    readonly variant?: keyof typeof Variant;
}>;
