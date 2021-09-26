import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructures";
import {IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter/validation";

@ComponentName("RapiDoc")
export class RapidDocComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly apiName: string;
}
