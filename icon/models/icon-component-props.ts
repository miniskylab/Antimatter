import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructure";
import {IsDefined, IsEnum, IsString} from "@miniskylab/antimatter/validation";
import {IsOptional} from "class-validator";
import {CSSProperties, MouseEventHandler, PointerEventHandler} from "react";
import {IconName} from "./icon-name";

@ComponentName("Icon")
export class IconComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly className?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type IconName
     */
    @IsEnum(IconName)
    @IsDefined()
    readonly iconName: IconName;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly style?: CSSProperties;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPointerDown?: PointerEventHandler;
}
