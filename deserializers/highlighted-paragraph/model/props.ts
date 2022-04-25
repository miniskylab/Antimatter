import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as HighlightedParagraphProps, Variant} from "@miniskylab/antimatter-highlighted-paragraph";
import {IconName} from "@miniskylab/antimatter-icon";

export type Props = SerializedProps<HighlightedParagraphProps, {
    readonly variant?: keyof typeof Variant;
    readonly icon?: keyof typeof IconName;
}>;
