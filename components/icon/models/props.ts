import {ComponentName, ComponentProps, IsBoolean, IsDefined, IsEnum, type PointerEvents} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {type IconStyle} from "./style";

@ComponentName("Icon")
export class IconProps extends ComponentProps<IconStyle>
{
    /**
     * Specify the name of the icon to display.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly name: DefaultIconSet;


    /**
     * Set this option to ***false*** to prevent users from selecting or highlighting the icon.
     */
    @IsBoolean()
    @IsOptional()
    readonly selectable?: boolean;


    /**
     * This option determines whether this component can be the target of pointer events.
     *
     * <p style="padding:0;margin:0">• `auto`: This component can be the target of pointer events.</p>
     * <p style="padding:0;margin:0">• `none`: This component is never the target of pointer events.</p>
     * <p style="padding:0;margin:0">• `box-none`: This component is never the target of pointer events but its subcomponents can be.</p>
     * <p>• `box-only`: This component can be the target of pointer events but its subcomponents cannot be.</p>
     */
    @IsOptional()
    readonly pointerEvents?: PointerEvents;
}
