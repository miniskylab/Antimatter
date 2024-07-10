import {ArrayNotEmpty, ComponentName, ComponentProps, IsArray, IsDefined} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {BootstrapEvent, Event} from "../components";
import type {BootstrapEventData, EventData} from "../types";
import {type TimelineStyle} from "./style";

@ComponentName("Timeline")
export class TimelineProps extends ComponentProps<TimelineStyle>
{
    /**
     * Specify all events of the timeline.
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Event.Props)
    readonly events: EventData[];


    /**
     * Specify the event at the origin of the timeline.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => BootstrapEvent.Props)
    readonly bootstrapEvent?: BootstrapEventData;
}
