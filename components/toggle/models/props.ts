import {ComponentName, ComponentProps, IsEnum} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {Status} from "../enums";
import {type ToggleStyle} from "./style";

@ComponentName("Toggle")
export class ToggleProps extends ComponentProps<ToggleStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Status
     */
    @IsEnum(Status)
    @IsOptional()
    readonly status?: Status;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newStatus: Status) => void;
}
