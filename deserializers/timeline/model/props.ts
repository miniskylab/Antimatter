import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {IconName} from "@miniskylab/antimatter-icon";
import {BootstrapEvent, Props as TimelineProps, Variant} from "@miniskylab/antimatter-timeline";
import {Modify} from "@miniskylab/antimatter-typescript";

export type Props = SerializedProps<TimelineProps, {
    readonly variant?: keyof typeof Variant;
    readonly bootstrapEvent?: Modify<BootstrapEvent, {
        readonly icon: keyof typeof IconName;
    }>;
}>;
