import {Props as DropdownMenuProps, Variant} from "@miniskylab/antimatter-dropdown-menu";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<DropdownMenuProps, {
    readonly variant?: keyof typeof Variant;
}>;
