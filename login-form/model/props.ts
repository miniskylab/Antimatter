import {ButtonProps} from "@miniskylab/antimatter-button";
import {ComponentName, ComponentProps, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {InputFieldProps} from "@miniskylab/antimatter-input-field";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {LoginFormStyle} from "./style";

@ComponentName("Login Form")
export class LoginFormProps extends ComponentProps<LoginFormStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type IconName
     */
    @IsEnum(IconName)
    @IsDefined()
    readonly logo: IconName;


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
    readonly description: string;


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
