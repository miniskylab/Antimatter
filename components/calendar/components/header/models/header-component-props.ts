import {IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {IsOptional} from "class-validator";
import {MouseEventHandler} from "react";

@ComponentName("Header")
export class HeaderComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    headline?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onPrevClick?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onNextClick?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onHeadlineClick?: MouseEventHandler;
}