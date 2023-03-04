import {ComponentName, ComponentProps, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {IconName} from "./icon-name";
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
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly pointerEvents?: "none" | "auto";
}
