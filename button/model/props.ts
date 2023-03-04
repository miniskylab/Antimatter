import {ComponentName, ComponentProps, GestureResponderEventHandler, IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {IsOptional} from "class-validator";
import {ButtonStyle} from "./style";

@ComponentName("Button")
export class ButtonProps extends ComponentProps<ButtonStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly label?: string;


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
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: GestureResponderEventHandler;
}
