import {ButtonProps} from "@miniskylab/antimatter-button";
import {IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {InputFieldProps} from "@miniskylab/antimatter-input-field";
import {Child, ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";

@ComponentName("Login Form")
export class LoginFormProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly logo: string;


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
    readonly usernameInputField: Pick<Child<InputFieldProps>, "icon" | "placeholder">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => InputFieldProps)
    readonly passwordInputField: Pick<Child<InputFieldProps>, "icon" | "placeholder">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ButtonProps)
    readonly loginButton: Pick<Child<ButtonProps>, "label">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onLogin?: (username: string, password: string) => void;
}
