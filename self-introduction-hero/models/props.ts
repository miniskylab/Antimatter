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
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    readonly coverPhoto: ImageSourcePropType;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    readonly avatar: ImageSourcePropType;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly alternativeName: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly locationLabel: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly locationValue: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly emailLabel: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsEmail()
    @IsString()
    @IsDefined()
    readonly emailValue: string;


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
    @IsOptional()
    @ValidateNested()
    @Type(() => DownloadButtonProps)
    readonly downloadButton?: DownloadButtonProps;
}
