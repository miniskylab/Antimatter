import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsArray, IsOptional} from "class-validator";

@ComponentName("Topbar")
export class TopbarProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    readonly functionalityIcons?: JSX.Element[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    readonly notificationIcons?: JSX.Element[];
}
