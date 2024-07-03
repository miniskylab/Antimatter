import {DropDirection} from "@miniskylab/antimatter-dropdown-menu";

export type State = {
    readonly openedDropdownMenuColumnIndex?: number;
    readonly dropdownMenuDropDirection: DropDirection;
};
