import {IsEnum} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsDefined} from "class-validator";
import {Illustration} from "./illustration";

export class IconIllustration extends Illustration
{
    readonly type = "icon";


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly iconName: DefaultIconSet;
}
