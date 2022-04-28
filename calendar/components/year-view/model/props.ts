import {IsInteger} from "@miniskylab/antimatter-class-validator";
import {ComponentProps} from "@miniskylab/antimatter-model";
import {Decade} from "@miniskylab/antimatter-typescript";
import {IsOptional} from "class-validator";

export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsInteger()
    @IsOptional()
    selectedYear?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsInteger()
    @IsOptional()
    displayingDecade?: Decade;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onYearClick?: (year: number) => void;
}
