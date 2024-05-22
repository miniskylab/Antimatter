import {ComponentName, ComponentProps, IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {type DownloadButtonStyle} from "./style";

@ComponentName("Download Button")
export class DownloadButtonProps extends ComponentProps<DownloadButtonStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly href?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly label?: string;


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
     */
    @IsString()
    @IsOptional()
    readonly fileName?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;
}
