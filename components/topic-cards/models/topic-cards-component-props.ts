import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {ArrayNotEmpty, IsArray, IsDefined} from "@miniskylab/antimatter-class-validator";
import {CardProps} from "../components/card";

@ComponentName("Topic Cards")
export class TopicCardsComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    readonly cards: CardProps[];
}
