import {IconName, Props as IconProps, Variant} from "@miniskylab/antimatter-icon";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<IconProps, {
    readonly variant?: keyof typeof Variant;
    readonly iconName: IconName[keyof IconName];
}>;
