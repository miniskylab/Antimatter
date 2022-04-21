import {Props as HighlightedParagraphProps, Variant} from "@miniskylab/antimatter-highlighted-paragraph";
import {IconName} from "@miniskylab/antimatter-icon";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<HighlightedParagraphProps, {
    readonly variant?: keyof typeof Variant;
    readonly icon?: IconName[keyof IconName];
}>;
