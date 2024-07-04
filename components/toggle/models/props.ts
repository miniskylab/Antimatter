import {ComponentName, ComponentProps, IsEnum} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {Status} from "../enums";
import {type ToggleStyle} from "./style";

@ComponentName("Toggle")
export class ToggleProps extends ComponentProps<ToggleStyle>
{
    /**
     * Set the status of the toggle.
     *
     * @type Status
     */
    @IsEnum(Status)
    @IsOptional()
    readonly status?: Status;


    /**
     * Set the icon displayed on the toggle.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * A piece of code that will be executed when the toggle changes status.
     */
    readonly onChange?: (newStatus: Status) => void;
}
