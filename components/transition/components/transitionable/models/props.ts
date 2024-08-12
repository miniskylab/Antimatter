import {ComponentProps, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {type ReactNode} from "react";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsDefined()
    readonly children: ReactNode;


    @IsString()
    @IsDefined()
    readonly id: string;


    @IsDefined()
    readonly onReadyToUnmount: (transitionableId: string) => void;
}
