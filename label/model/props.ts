import {ComponentName, ComponentProps, IsBoolean, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {ReactNode} from "react";
import {LabelStyle} from "./style";

@ComponentName("Label")
export class LabelProps extends ComponentProps<LabelStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly selectable?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly pointerEvents?: "none" | "auto";
}
