import {ArrayNotEmpty, IsArray, IsDefined} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {Card} from "../components";

@ComponentName("Topic Cards")
export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Card.Props[]
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested()
    @Type(() => Card.Props)
    readonly cards: Card.Props[];
}
