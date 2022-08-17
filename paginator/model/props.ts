import {IsDefined, IsLessThanOrEqualTo, IsNumber, IsPositive, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";

@ComponentName("Paginator")
export class PaginatorProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsPositive()
    @IsDefined()
    readonly pageCount: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsPositive()
    @IsLessThanOrEqualTo("pageCount")
    @IsOptional()
    readonly selectedPage?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsPositive()
    @IsOptional()
    readonly maxTotalPagerCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsPositive()
    @IsLessThanOrEqualTo("maxTotalPagerCount")
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
