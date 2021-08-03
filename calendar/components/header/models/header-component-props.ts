import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {IsString} from "antimatter/validation";
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
    onPrevClicked?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onNextClicked?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onHeadlineClicked?: MouseEventHandler;
}
