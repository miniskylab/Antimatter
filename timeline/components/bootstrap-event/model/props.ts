import {IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentProps} from "@miniskylab/antimatter-model";

export class BootstrapEventProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly icon: string;

    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;

    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly description: string;
}
