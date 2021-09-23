import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructures";
import {IsString} from "@miniskylab/antimatter/validation";
import {IsOptional} from "class-validator";
import {ReactNode} from "react";

@ComponentName("Panel")
export class PanelComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly title?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly children?: ReactNode;
}
