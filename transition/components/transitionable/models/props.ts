import {ComponentProps, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {ReactNode} from "react";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    readonly children: ReactNode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    readonly onReadyToUnmount: (transitionableId: string) => void;
}
