import {ComponentName, ComponentProps, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {FooterStyle} from "./style";

@ComponentName("Footer")
export class FooterProps extends ComponentProps<FooterStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly text: string;
}
