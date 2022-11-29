import {ComponentName, ComponentProps, IsDefined, IsEnum} from "@miniskylab/antimatter-framework";
import {IconName} from "./icon-name";
import {IconStyle} from "./style";

@ComponentName("Icon")
export class IconProps extends ComponentProps<IconStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type IconName
     */
    @IsEnum(IconName)
    @IsDefined()
    readonly name: IconName;
}
