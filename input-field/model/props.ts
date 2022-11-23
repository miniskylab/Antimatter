import {IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-class-validator";
import {IconName} from "@miniskylab/antimatter-icon";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";
import {NativeSyntheticEvent, TextInputFocusEventData, TextInputKeyPressEventData} from "react-native";
import {InputFieldStyles} from "./styles";

@ComponentName("Input Field")
export class InputFieldProps extends ComponentProps<InputFieldStyles>
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
    readonly onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onKeyPress?: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newValue: string) => void;
}
