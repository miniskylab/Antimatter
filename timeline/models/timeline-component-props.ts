import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {ArrayNotEmpty, IsArray, IsDefined} from "antimatter/validation";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {EventProps} from "../components/event";
import {TimelineBootstrapEvent} from "./timeline-bootstrap-event";

@ComponentName("Timeline")
export class TimelineComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    readonly events: EventProps[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsOptional()
    @Type(() => TimelineBootstrapEvent)
    readonly bootstrapEvent?: TimelineBootstrapEvent;
}
