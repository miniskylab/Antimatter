import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsNumber,
    IsPositive,
    IsString,
    TextInputFocusEventHandler,
    TextInputKeyPressEventHandler,
    TextInputSelectionChangeEventHandler
} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type KeyboardTypeOptions} from "react-native";
import {Selection} from "../classes";
import {type TextInputStyle} from "./style";

@ComponentName("Text Input")
export class TextInputProps extends ComponentProps<TextInputStyle>
{
    /**
     * @see https://reactnative.dev/docs/textinput#value
     */
    @IsString()
    @IsOptional()
    readonly value?: string;


    /**
     * @see https://reactnative.dev/docs/view#focusable-android
     */
    @IsBoolean()
    @IsOptional()
    readonly focusable?: boolean;


    /**
     * @see https://reactnative.dev/docs/textinput#autofocus
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * @see https://reactnative.dev/docs/textinput#editable
     */
    @IsBoolean()
    @IsOptional()
    readonly editable?: boolean;


    /**
     * @see https://reactnative.dev/docs/textinput#securetextentry
     */
    @IsBoolean()
    @IsOptional()
    readonly secureTextEntry?: boolean;


    /**
     * @see https://reactnative.dev/docs/textinput#contextmenuhidden
     */
    @IsBoolean()
    @IsOptional()
    readonly contextMenuHidden?: boolean;


    /**
     * @see https://reactnative.dev/docs/textinput#autocorrect
     */
    @IsBoolean()
    @IsOptional()
    readonly autoCorrect?: boolean;


    /**
     * @see https://reactnative.dev/docs/textinput#maxlength
     */
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly maxLength?: number;


    /**
     * @see https://reactnative.dev/docs/textinput#keyboardtype
     */
    @IsOptional()
    readonly keyboardType?: KeyboardTypeOptions;


    /**
     * @see https://reactnative.dev/docs/textinput#selection
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Selection)
    readonly selection?: Selection;


    /**
     * @see https://reactnative.dev/docs/textinput#onblur
     */
    readonly onBlur?: TextInputFocusEventHandler;


    /**
     * @see https://reactnative.dev/docs/textinput#onfocus
     */
    readonly onFocus?: TextInputFocusEventHandler;


    /**
     * @see https://reactnative.dev/docs/textinput#onkeypress
     */
    readonly onKeyPress?: TextInputKeyPressEventHandler;


    /**
     * @see https://reactnative.dev/docs/textinput#onselectionchange
     */
    readonly onSelectionChange?: TextInputSelectionChangeEventHandler;


    /**
     * @see https://reactnative.dev/docs/textinput#onchangetext
     */
    readonly onChangeText?: (newText: string) => void;
}
