import {ComponentName, ComponentProps, GestureResponderEventHandler, IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {type ButtonStyle} from "./style";

@ComponentName("Button")
export class ButtonProps extends ComponentProps<ButtonStyle>
{
    /**
     * Specify the text to be displayed on the button.
     */
    @IsString()
    @IsOptional()
    readonly label?: string;


    /**
     * Specify the icon to be displayed on the button.
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
     * A piece of code that will be executed when users press the button.
     */
    readonly onPress?: GestureResponderEventHandler;
}
