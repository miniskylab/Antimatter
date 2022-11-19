import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";
import {ReactNode} from "react";
import {LabelStyles} from "./styles";

@ComponentName("Label")
export class LabelProps extends ComponentProps<LabelStyles>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly children?: ReactNode;
}
