import {ComponentName, ComponentProps, GestureResponderEventHandler, IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {type ButtonStyle} from "./style";

@ComponentName("Button")
export class ButtonProps extends ComponentProps<ButtonStyle>
{
    /**
     * Specify the text that will be inscribed onto the button for identification or description.
     */
    @IsString()
    @IsOptional()
    readonly label?: string;


    /**
     * Specify the icon that will be inscribed onto the button.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * Set this option to ***true*** to prevent users from pressing the button.
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    /**
     * Specify the piece of code that will be executed when users press the button.
     */
    readonly onPress?: GestureResponderEventHandler;
}
