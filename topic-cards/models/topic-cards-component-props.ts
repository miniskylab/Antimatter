import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {ArrayNotEmpty, IsArray, IsDefined} from "antimatter/validation";
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
