import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultDropdownMenuVariant, DropdownMenuVariant} from "../variants";
import {DropdownMenuComponentProps} from "./dropdown-menu-component-props";
import {DropdownMenuExportProps} from "./dropdown-menu-export-props";

export class DropdownMenuExporter extends ComponentExporter<DropdownMenuExportProps>
{
    protected get PropsType(): ClassConstructor<DropdownMenuComponentProps>
    {
        return DropdownMenuComponentProps;
    }

    protected get DefaultProps(): Partial<DropdownMenuComponentProps>
    {
        return {
            keyValueSet: {},
            selectedKey: undefined,
            placeholderText: String.EMPTY,
            canRemoveSelection: false,
            isOpenByDefault: false,
            onChange: undefined
        };
    }

    protected deserialize(dropdownMenuExportProps: DropdownMenuExportProps): DropdownMenuExportProps
    {
        return {
            ...dropdownMenuExportProps
        };
    }

    protected getVariant(dropdownMenuExportProps: DropdownMenuExportProps): CSS
    {
        switch (Enum.getValue(DropdownMenuVariant, dropdownMenuExportProps.variant))
        {
            case null:
            case undefined:
            case DropdownMenuVariant.Default:
                return DefaultDropdownMenuVariant;

            default:
                return dropdownMenuExportProps.variant as CSS;
        }
    }
}
