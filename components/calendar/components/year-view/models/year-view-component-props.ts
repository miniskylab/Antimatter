import {Decade} from "@miniskylab/antimatter-typescript";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {IsInteger} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";

@ComponentName("Year View")
export class YearViewComponentProps extends ComponentProps
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
    onYearClicked?: (clickedYear: number) => void;
}
