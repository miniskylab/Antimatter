import {ButtonProps} from "@miniskylab/antimatter-button";
import {ComponentName, ComponentProps, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {InputFieldProps} from "@miniskylab/antimatter-input-field";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {InputField, LoginButton} from "../types";
import {type LoginFormStyle} from "./style";

@ComponentName("Login Form")
export class LoginFormProps extends ComponentProps<LoginFormStyle>
{
    /**
     * Specify the icon that will be inscribed onto the login form.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly logo: DefaultIconSet;


    /**
     * Specify the text that provides a succinct description of the login form.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly title: string;


    /**
     * Specify the text that clarifies or provides context to the title.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly subtitle: string;


    /**
     * Specify the username input field.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => InputFieldProps)
    readonly usernameInputField: InputField;


    /**
     * Specify the password input field.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => InputFieldProps)
    readonly passwordInputField: InputField;


    /**
     * Specify the login button.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ButtonProps)
    readonly loginButton: LoginButton;


    /**
     * Specify the piece of code that will be executed when users log in.
     */
    readonly onLogin?: (username: string, password: string) => void;
}
