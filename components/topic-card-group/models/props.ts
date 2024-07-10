import {ArrayNotEmpty, ComponentName, ComponentProps, IsArray, IsDefined} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {Card} from "../components";
import type {CardData} from "../types";
import {type TopicCardGroupStyle} from "./style";

@ComponentName("Topic Card Group")
export class TopicCardGroupProps extends ComponentProps<TopicCardGroupStyle>
{
    /**
     * Specify all the cards of the topic card group.
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Card.Props)
    readonly cards: CardData[];
}
