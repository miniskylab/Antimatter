import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsEnum,
    IsString,
    Selection,
    TextInputFocusEventHandler,
    TextInputKeyPressEventHandler,
    TextInputSelectionChangeEventHandler
} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {KeyboardTypeOptions} from "react-native";
import {InputFieldStyle} from "./style";

@ComponentName("Input Field")
export class InputFieldProps extends ComponentProps<InputFieldStyle>
{
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
    @IsString()
    @IsOptional()
    readonly value?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly placeholder?: string;


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
    readonly isPasswordField?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly contextMenuHidden?: boolean;


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
