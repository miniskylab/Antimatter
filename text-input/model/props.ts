import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsNumber,
    IsPositive,
    IsString,
    Selection,
    TextInputFocusEventHandler,
    TextInputKeyPressEventHandler,
    TextInputSelectionChangeEventHandler
} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {KeyboardTypeOptions} from "react-native";
import {TextInputStyle} from "./style";

@ComponentName("Text Input")
export class TextInputProps extends ComponentProps<TextInputStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly value?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly focusable?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly editable?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly secureTextEntry?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly contextMenuHidden?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly autoCorrect?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly maxLength?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly keyboardType?: KeyboardTypeOptions;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Selection)
    readonly selection?: Selection;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onBlur?: TextInputFocusEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onFocus?: TextInputFocusEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onKeyPress?: TextInputKeyPressEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectionChange?: TextInputSelectionChangeEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChangeText?: (newText: string) => void;
}
