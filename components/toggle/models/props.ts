import {ComponentName, ComponentProps, IsBoolean, IsEnum} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {Status} from "../enums";
import {type ToggleStyle} from "./style";

@ComponentName("Toggle")
export class ToggleProps extends ComponentProps<ToggleStyle>
{
    /**
     * Specify the state the toggle is in.
     *
     * @type Status
     */
    @IsEnum(Status)
    @IsOptional()
    readonly status?: Status;


    /**
     * Specify the icon that will be displayed on the toggle.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * Set this option to ***true*** to prevent users from changing the state of the toggle.
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    /**
     * Specify the piece of code that will be executed when the toggle changes status.
     */
    readonly onChange?: (newStatus: Status) => void;
}
