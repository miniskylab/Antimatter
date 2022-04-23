import {ArrayNotEmpty, IsArray, IsDefined} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {DataX} from "./data-x";
import {DataY} from "./data-y";

@ComponentName("Line Chart")
export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @Type(() => DataX)
    readonly dataX: DataX[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @Type(() => DataY)
    readonly dataY: DataY[];
}
