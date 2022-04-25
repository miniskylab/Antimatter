import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as DropdownMenuProps, Variant} from "@miniskylab/antimatter-dropdown-menu";

export type Props = SerializedProps<DropdownMenuProps, {
    readonly variant?: keyof typeof Variant;
}>;
