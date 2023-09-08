import {IsEnum} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {IsDefined} from "class-validator";
import {Illustration} from "./illustration";

export class IconIllustration extends Illustration
{
    readonly type = "icon";


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type IconName
     */
    @IsEnum(IconName)
    @IsDefined()
    readonly iconName: IconName;
}
