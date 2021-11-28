import {IsBoolean, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {IsOptional} from "class-validator";
import {FocusEventHandler, KeyboardEventHandler, PointerEventHandler} from "react";

@ComponentName("Input Field")
export class InputFieldComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly value?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly placeholderText?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isPasswordField?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onBlur?: FocusEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onFocus?: FocusEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPointerDown?: PointerEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onKeyDown?: KeyboardEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newValue: string) => void;
}
