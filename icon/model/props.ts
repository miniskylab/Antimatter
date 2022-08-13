import {IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {MouseEventHandler, PointerEventHandler} from "react";

@ComponentName("Icon")
export class IconProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPointerDown?: PointerEventHandler;
}
