import {Props as ButtonProps, Target, Variant} from "@miniskylab/antimatter-button";
import {IconName} from "@miniskylab/antimatter-icon";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<ButtonProps, {
    readonly variant?: keyof typeof Variant;
    readonly icon?: IconName[keyof IconName];
    readonly target?: Target[keyof Target];
}>;
