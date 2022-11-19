import {IsDefined, IsEnum} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IconName} from "./icon-name";
import {IconStyles} from "./styles";

@ComponentName("Icon")
export class IconProps extends ComponentProps<IconStyles>
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
