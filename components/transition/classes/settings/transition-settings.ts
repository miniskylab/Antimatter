import {IsEnum} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";
import {Animation} from "../../enums";

export abstract class TransitionSettings
{
    @IsEnum(Animation)
    @IsDefined()
    readonly animation: Animation;
}
