import {IsBoolean, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";
import {MouseEventHandler, PointerEventHandler} from "react";
import {Target} from "./target";

@ComponentName("Button")
export class ButtonProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly href?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly label?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly icon?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Target
     */
    @IsEnum(Target)
    @IsOptional()
    readonly target?: Target;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPointerDown?: PointerEventHandler;
}
