import {IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-class-validator";
import {Props as IconProps} from "@miniskylab/antimatter-icon";
import {Props as LabelProps} from "@miniskylab/antimatter-label";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MouseEventHandler} from "react";
import {Target} from "./target";

@ComponentName("Button")
export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly href?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type LabelProps
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => LabelProps)
    readonly label?: LabelProps;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type IconProps
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => IconProps)
    readonly icon?: IconProps;


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
}
