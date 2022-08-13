import {ButtonProps} from "@miniskylab/antimatter-button";
import {IsDefined} from "@miniskylab/antimatter-class-validator";
import {IconProps} from "@miniskylab/antimatter-icon";
import {InputFieldProps} from "@miniskylab/antimatter-input-field";
import {LabelProps} from "@miniskylab/antimatter-label";
import {Child, ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";

@ComponentName("Login Form")
export class LoginFormProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => IconProps)
    readonly logo: Child<IconProps>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => LabelProps)
    readonly title: Child<LabelProps>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => LabelProps)
    readonly description: Child<LabelProps>;


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
