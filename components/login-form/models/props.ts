import {ButtonProps} from "@miniskylab/antimatter-button";
import {ComponentName, ComponentProps, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {InputFieldProps} from "@miniskylab/antimatter-input-field";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {type LoginFormStyle} from "./style";

@ComponentName("Login Form")
export class LoginFormProps extends ComponentProps<LoginFormStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly logo: DefaultIconSet;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly title: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly subtitle: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => InputFieldProps)
    readonly usernameInputField: Pick<InputFieldProps, "icon" | "placeholder">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => InputFieldProps)
    readonly passwordInputField: Pick<InputFieldProps, "icon" | "placeholder">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ButtonProps)
    readonly loginButton: Pick<ButtonProps, "label">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onLogin?: (username: string, password: string) => void;
}
