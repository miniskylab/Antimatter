import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsNumber,
    IsPositive,
    IsString,
    type TextInputFocusEventHandler,
    type TextInputKeyPressEventHandler,
    type TextInputSelectionChangeEventHandler
} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type KeyboardTypeOptions} from "react-native";
import {Selection} from "../classes";
import {type TextInputStyle} from "./style";

@ComponentName("Text Input")
export class TextInputProps extends ComponentProps<TextInputStyle>
{
    @IsString()
    @IsOptional()
    readonly value?: string;


    @IsBoolean()
    @IsOptional()
    readonly focusable?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly editable?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly secureTextEntry?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly contextMenuHidden?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly autoCorrect?: boolean;


    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly maxLength?: number;


    @IsOptional()
    readonly keyboardType?: KeyboardTypeOptions;


    @IsOptional()
    @ValidateNested()
    @Type(() => Selection)
    readonly selection?: Selection;


    @IsOptional()
    readonly onBlur?: TextInputFocusEventHandler;


    @IsOptional()
    readonly onFocus?: TextInputFocusEventHandler;


    @IsOptional()
    readonly onKeyPress?: TextInputKeyPressEventHandler;


    @IsOptional()
    readonly onSelectionChange?: TextInputSelectionChangeEventHandler;


    @IsOptional()
    readonly onChangeText?: (newText: string) => void;
}
