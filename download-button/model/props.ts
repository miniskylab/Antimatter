import {IsBoolean, IsString} from "@miniskylab/antimatter-class-validator";
import {Props as IconProps} from "@miniskylab/antimatter-icon";
import {Props as LabelProps} from "@miniskylab/antimatter-label";
import {Child, ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";

@ComponentName("Download Button")
export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly href?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Child<LabelProps>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => LabelProps)
    readonly label?: Child<LabelProps>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Child<IconProps>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => IconProps)
    readonly icon?: Child<IconProps>;


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
