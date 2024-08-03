import {ComponentProps, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {type ReactNode} from "react";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the component that the transitionable wraps around.
     */
    @IsDefined()
    readonly children: ReactNode;


    /**
     * Specify the text that will be used to uniquely identify the transitionable.
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * Specify the piece of code that will be executed when the transitionable is ready to be unmounted.
     */
    @IsDefined()
    readonly onReadyToUnmount: (transitionableId: string) => void;
}
