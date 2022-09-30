import {IsDefined} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {Swatch} from "./swatch";

@ComponentName("Color Scheme")
export class ColorSchemeProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Swatch)
    readonly swatches: Swatch[];
}
