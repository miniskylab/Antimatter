import {IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {Props as DatePickerProps} from "@miniskylab/antimatter-date-picker";
import {Props as DropdownMenuProps} from "@miniskylab/antimatter-dropdown-menu";
import {Props as InputFieldProps} from "@miniskylab/antimatter-input-field";
import {Props as LabelProps} from "@miniskylab/antimatter-label";
import {Props as NumericInputFieldProps} from "@miniskylab/antimatter-numeric-input-field";

export class Cell
{
    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly dataType: "label" | "input-field" | "numeric-input-field" | "date-picker" | "dropdown-menu";


    /**
     *
     */
    @IsDefined()
    readonly data: LabelProps | InputFieldProps | NumericInputFieldProps | DatePickerProps | DropdownMenuProps;
}
