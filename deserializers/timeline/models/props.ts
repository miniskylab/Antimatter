import {IconName} from "@miniskylab/antimatter-icon";
import {BootstrapEvent, Props as TimelineProps, Variant} from "@miniskylab/antimatter-timeline";
import {Modify} from "@miniskylab/antimatter-typescript";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<TimelineProps, {
    readonly variant?: keyof typeof Variant;
    readonly bootstrapEvent?: Modify<BootstrapEvent, {
        readonly icon: IconName[keyof IconName];
    }>;
}>;
