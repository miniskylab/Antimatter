import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {IsArray, IsOptional} from "class-validator";
import {MouseEventHandler} from "react";

@ComponentName("Record")
export class RecordComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    readonly cellData?: JSX.Element[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: MouseEventHandler;
}
