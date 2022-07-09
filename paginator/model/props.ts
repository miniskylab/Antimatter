import {IsDefined, IsNumber, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";

@ComponentName("Paginator")
export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsDefined()
    readonly pageCount: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsOptional()
    readonly selectedPage?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsOptional()
    readonly maxMiddlePagerCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsOptional()
    readonly maxMarginPagerCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly prevLabel?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly nextLabel?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPageChange?: (newlySelectedPage: number) => void;
}
