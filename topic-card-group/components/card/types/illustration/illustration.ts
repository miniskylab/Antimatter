import {IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";

export abstract class Illustration
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly type: "image" | "icon";
}
