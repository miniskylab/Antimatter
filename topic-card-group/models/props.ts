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
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Card.Props)
    readonly cards: CardData[];
}
