import {DatePickerProps} from "@miniskylab/antimatter-date-picker";
import {DropdownMenuProps} from "@miniskylab/antimatter-dropdown-menu";
import {InputFieldProps} from "@miniskylab/antimatter-input-field";
import {LabelProps} from "@miniskylab/antimatter-label";
import {NumericInputFieldProps} from "@miniskylab/antimatter-numeric-input-field";
import {IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";

export class RecordCell
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
