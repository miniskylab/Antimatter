import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {IsDefined, IsNotEmpty, IsString} from "antimatter/validation";

@ComponentName("Label")
export class LabelComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly text: string;
}
