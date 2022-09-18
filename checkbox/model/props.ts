import {IsEnum} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";
import {Status} from "./status";

@ComponentName("Checkbox")
export class CheckboxProps extends ComponentProps
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
     */
    readonly onChange?: (newStatus: Status) => void;
}
