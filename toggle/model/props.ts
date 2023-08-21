import {ComponentName, ComponentProps, IsEnum} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {IsOptional} from "class-validator";
import {Status} from "../enum";
import {ToggleStyle} from "./style";

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
     * @type IconName
     */
    @IsEnum(IconName)
    @IsOptional()
    readonly icon?: IconName;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newStatus: Status) => void;
}
