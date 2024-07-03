import {ComponentName, ComponentProps, GestureResponderEventHandler, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {LocalAuthenticationStatus} from "../enums";
import {type LocalAuthenticationFormStyle} from "./style";

@ComponentName("Local Authentication Form")
export class LocalAuthenticationFormProps extends ComponentProps<LocalAuthenticationFormStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly title?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly subtitle?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type LocalAuthenticationStatus
     */
    @IsEnum(LocalAuthenticationStatus)
    @IsOptional()
    readonly localAuthenticationStatus?: LocalAuthenticationStatus;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPrompt?: GestureResponderEventHandler;
}
