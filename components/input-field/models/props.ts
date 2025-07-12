import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsEnum,
    IsInteger,
    IsString,
    Min,
    type TextInputFocusEventHandler,
    type TextInputKeyPressEventHandler,
    type TextInputSelectionChangeEventHandler
} from "@miniskylab/antimatter-framework";
import {Selection} from "@miniskylab/antimatter-text-input";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type KeyboardTypeOptions} from "react-native";
import {type InputFieldStyle} from "./style";

@ComponentName("Input Field")
export class InputFieldProps extends ComponentProps<InputFieldStyle>
{
    /**
     * Specify the icon that will be inscribed onto the input field.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * Specify the text that has been entered into the input field.
     */
    @IsString()
    @IsOptional()
    readonly value?: string;


    /**
     * Specify the text that will be displayed before input has been entered.
     */
    @IsString()
    @IsOptional()
    readonly placeholder?: string;


    /**
     * Set this option to ***false*** to prevent the input field from receiving focus.
     */
    @IsBoolean()
    @IsOptional()
    readonly focusable?: boolean;


    /**
     * Set this option to ***true*** to specify that the input field should automatically get focused when it is mounted.
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * Set this option to ***false*** to prevent users from editing the entered text in the input field.
     */
    @IsBoolean()
    @IsOptional()
    readonly editable?: boolean;


    /**
     * Set this option to ***true*** to make the input field obscure entered text so that sensitive text like passwords stays secure.
     */
    @IsBoolean()
    @IsOptional()
    readonly isPasswordField?: boolean;


    /**
     * <b className="property-description__supported-platform-section">
     *     Supported Platforms:
     *     <b className="property-description__supported-platform-value--iOS">iOS</b>,
     *     <b className="property-description__supported-platform-value--android">Android</b>
     * </b>
     *
     * Set this option to ***true*** to hide the default, built-in context menu.
     */
    @IsBoolean()
    @IsOptional()
    readonly contextMenuHidden?: boolean;


    /**
     * Set this option to ***false*** to disable the built-in autocorrect functionality.
     */
    @IsBoolean()
    @IsOptional()
    readonly autoCorrect?: boolean;


    /**
     * Specify the maximum number of characters that can be entered into the input field.
     */
    @Min(0)
    @IsInteger()
    @IsOptional()
    readonly maxLength?: number;


    /**
     * <b className="property-description__supported-platform-section">
     *     Supported Platforms:
     *     <b className="property-description__supported-platform-value--iOS">iOS</b>,
     *     <b className="property-description__supported-platform-value--android">Android</b>
     * </b>
     *
     * Specify which keyboard to open when the input field has received focus.
     */
    @IsOptional()
    readonly keyboardType?: KeyboardTypeOptions;


    /**
     * Specify the start and end of the input field's selection. Set the start and end to the same value to position the cursor.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Selection)
    readonly selection?: Selection;


    /**
     * Specify the piece of code that will be executed when the input field has lost focus.
     */
    readonly onBlur?: TextInputFocusEventHandler;


    /**
     * Specify the piece of code that will be executed when the input field has received focus.
     */
    readonly onFocus?: TextInputFocusEventHandler;


    /**
     * Specify the piece of code that will be executed when a key is pressed while the input field is being focused.
     */
    readonly onKeyPress?: TextInputKeyPressEventHandler;


    /**
     * Specify the piece of code that will be executed when the input field's selection is changed.
     */
    readonly onSelectionChange?: TextInputSelectionChangeEventHandler;


    /**
     * Specify the piece of code that will be executed when the entered text changes.
     */
    readonly onChangeText?: (newText: string) => void;
}
