import {DropdownMenu as DropdownMenuComponent} from "@miniskylab/antimatter-dropdown-menu";
import {DropdownMenuDeserializerCreator} from "./deserializer-creator";

export const DropdownMenu = new DropdownMenuDeserializerCreator().createFrom(DropdownMenuComponent);
export {Props} from "./model";
