import {Props as ButtonProps} from "@miniskylab/antimatter-button";
import {IsDefined, IsEnum} from "@miniskylab/antimatter-class-validator";
import {IconName} from "@miniskylab/antimatter-icon-legacy";
import {Props as InputFieldProps} from "@miniskylab/antimatter-input-field";
import {Props as LabelProps} from "@miniskylab/antimatter-label";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";

@ComponentName("Login Form")
export class Props extends ComponentProps
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
    @IsDefined()
    @ValidateNested()
    @Type(() => LabelProps)
    readonly titleLabel: LabelProps;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => LabelProps)
    readonly descriptionLabel: LabelProps;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type InputFieldProps
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => InputFieldProps)
    readonly usernameInputField: Pick<InputFieldProps, "variant" | "icon" | "placeholderText">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type InputFieldProps
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => InputFieldProps)
    readonly passwordInputField: Pick<InputFieldProps, "variant" | "icon" | "placeholderText">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type ButtonProps
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ButtonProps)
    readonly loginButton: Pick<ButtonProps, "variant" | "text">;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onLogin?: (username: string, password: string) => void;
}
