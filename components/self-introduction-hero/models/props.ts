import {DownloadButtonProps} from "@miniskylab/antimatter-download-button";
import {ComponentName, ComponentProps, IsDefined, IsEmail, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type ImageSourcePropType} from "react-native";
import {type SelfIntroductionHeroStyle} from "./style";

@ComponentName("Self-Introduction Hero")
export class SelfIntroductionHeroProps extends ComponentProps<SelfIntroductionHeroStyle>
{
    /**
     * Specify the large image at the top of the self-introduction hero.
     */
    @IsDefined()
    readonly coverPhoto: ImageSourcePropType;


    /**
     * Specify the image of the person.
     */
    @IsDefined()
    readonly avatar: ImageSourcePropType;


    /**
     * Specify the name of the person.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * Specify the alternative name of the person.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly alternativeName: string;


    /**
     * Specify the text that will be used for identification or description of the location of the person.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly locationLabel: string;


    /**
     * Specify the location of the person.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly locationValue: string;


    /**
     * Specify the text that will be used for identification or description of the email address of the person.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly emailLabel: string;


    /**
     * Specify the email address of the person.
     */
    @IsEmail()
    @IsString()
    @IsDefined()
    readonly emailValue: string;


    /**
     * Specify the short description of the person.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly description: string;


    /**
     * Specify the button that can be pressed to download the files related to the person.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => DownloadButtonProps)
    readonly downloadButton?: DownloadButtonProps;
}
