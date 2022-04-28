import {Props as ButtonProps} from "@miniskylab/antimatter-button";
import {IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName} from "@miniskylab/antimatter-model";
import {Omit} from "@miniskylab/antimatter-typescript";
import {IsOptional} from "class-validator";

@ComponentName("Download Button")
export class Props extends Omit(ButtonProps, ["target", "download", "onClick"])
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly fileName?: string;
}
