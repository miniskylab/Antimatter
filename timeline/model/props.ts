import {ArrayNotEmpty, IsArray, IsDefined} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Event} from "../components";
import {BootstrapEvent} from "./bootstrap-event";

@ComponentName("Timeline")
export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Event.Props[]
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested()
    @Type(() => Event.Props)
    readonly events: Omit<Event.Props, "position">[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => BootstrapEvent)
    readonly bootstrapEvent?: BootstrapEvent;
}
