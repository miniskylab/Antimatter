import {Props as ButtonProps, Target, Variant} from "@miniskylab/antimatter-button";
import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {IconName} from "@miniskylab/antimatter-icon";

export type Props = SerializedProps<ButtonProps, {
    readonly variant?: Variant.Type;
    readonly icon?: keyof typeof IconName;
    readonly target?: keyof typeof Target;
}>;
