import {ComponentName, ComponentProps, GestureResponderEventHandler, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {LocalAuthenticationStatus} from "../enums";
import {type LocalAuthenticationFormStyle} from "./style";

@ComponentName("Local Authentication Form")
export class LocalAuthenticationFormProps extends ComponentProps<LocalAuthenticationFormStyle>
{
    /**
     * Specify the text that provides a succinct description of the local authentication form.
     */
    @IsString()
    @IsOptional()
    readonly title?: string;


    /**
     * Specify the text that clarifies or provides context to the title.
     */
    @IsString()
    @IsOptional()
    readonly subtitle?: string;


    /**
     * Specify the icon that will be inscribed onto the local authentication form.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * Specify the way the local authentication form operates or behaves.
     *
     * @type LocalAuthenticationStatus
     */
    @IsEnum(LocalAuthenticationStatus)
    @IsOptional()
    readonly localAuthenticationStatus?: LocalAuthenticationStatus;


    /**
     * Specify the piece of code that will be executed when local authentication is prompted.
     */
    readonly onPrompt?: GestureResponderEventHandler;
}
