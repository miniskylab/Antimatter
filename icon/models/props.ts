import {ComponentName, ComponentProps, IsBoolean, IsDefined, IsEnum, PointerEvents} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {IconName} from "../enums";
import {IconStyle} from "./style";

@ComponentName("Icon")
export class IconProps extends ComponentProps<IconStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type IconName
     */
    @IsEnum(IconName)
    @IsDefined()
    readonly name: IconName;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly selectable?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly pointerEvents?: PointerEvents;
}