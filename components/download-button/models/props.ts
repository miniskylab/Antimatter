import {ComponentName, ComponentProps, IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {type DownloadButtonStyle} from "./style";

@ComponentName("Download Button")
export class DownloadButtonProps extends ComponentProps<DownloadButtonStyle>
{
    /**
     * <b className="property-description__supported-platform-section">
     *     Supported Platforms:
     *     <b className="property-description__supported-platform-value--web">Web</b>
     * </b>
     *
     * Specify the URL of the file to be downloaded.
     */
    @IsString()
    @IsOptional()
    readonly href?: string;


    /**
     * Specify the text that will be inscribed onto the download button for identification or description.
     */
    @IsString()
    @IsOptional()
    readonly label?: string;


    /**
     * Specify the icon that will be inscribed onto the download button.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * <b className="property-description__supported-platform-section">
     *     Supported Platforms:
     *     <b className="property-description__supported-platform-value--web">Web</b>
     * </b>
     *
     * Specify a new name for the downloaded file.
     */
    @IsString()
    @IsOptional()
    readonly fileName?: string;


    /**
     * Set this option to ***true*** to prevent users from pressing the button.
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;
}
