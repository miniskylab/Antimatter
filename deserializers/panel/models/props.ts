import {Props as PanelProps, Variant} from "@miniskylab/antimatter-panel";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<PanelProps, {
    readonly variant?: keyof typeof Variant;
}>;
