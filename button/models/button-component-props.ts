import {IconName} from "@miniskylab/antimatter/icon";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructure";
import {IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter/validation";
import {IsOptional} from "class-validator";
import {MouseEventHandler} from "react";
import {ButtonTarget} from "./button-target";

@ComponentName("Button")
export class ButtonComponentProps extends ComponentProps
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
    readonly text?: string;


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
     *
     * @type ButtonTarget
     */
    @IsEnum(ButtonTarget)
    @IsOptional()
    readonly target?: ButtonTarget;


    // TODO: union validation
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly download?: string | boolean;


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
}
