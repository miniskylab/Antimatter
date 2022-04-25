import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as PanelProps, Variant} from "@miniskylab/antimatter-panel";

export type Props = SerializedProps<PanelProps, {
    readonly variant?: keyof typeof Variant;
}>;
