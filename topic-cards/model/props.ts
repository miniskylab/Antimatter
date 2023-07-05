import {ArrayNotEmpty, ComponentName, ComponentProps, IsArray, IsDefined} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {Card} from "../component";
import {CardData} from "../type";
import {TopicCardsStyle} from "./style";

@ComponentName("Topic Cards")
export class TopicCardsProps extends ComponentProps<TopicCardsStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Card.Props)
    readonly cards: CardData[];
}
