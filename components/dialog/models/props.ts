import {ComponentName, ComponentProps, GestureResponderEventHandler, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {type DialogStyle} from "./style";

@ComponentName("Dialog")
export class DialogProps extends ComponentProps<DialogStyle>
{
    /**
     * Specify the text that provides a succinct description of the dialog.
     */
    @IsString()
    @IsOptional()
    readonly title?: string;


    /**
     * Specify the text that clarifies or provides context to the title.
     */
    @IsString()
    @IsOptional()
    readonly subtitle?: string;


    /**
     * Specify the icon that will be inscribed onto the dialog.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * Specify the piece of code that will be executed when users confirm the message.
     */
    readonly onConfirm?: GestureResponderEventHandler;
}
