import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {IconName, Props as IconProps, Variant} from "@miniskylab/antimatter-icon";

export type Props = SerializedProps<IconProps, {
    readonly variant?: keyof typeof Variant;
    readonly iconName: keyof typeof IconName;
}>;
