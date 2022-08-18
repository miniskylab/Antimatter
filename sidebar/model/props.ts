import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsArray, IsOptional} from "class-validator";

@ComponentName("Sidebar")
export class SidebarProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    readonly icons?: JSX.Element[];
}
