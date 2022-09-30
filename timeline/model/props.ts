import {ArrayNotEmpty, IsArray, IsDefined} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {BootstrapEvent, Event} from "../components";

@ComponentName("Timeline")
export class TimelineProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Event.Props)
    readonly events: Omit<Event.Props, keyof ComponentProps>[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => BootstrapEvent.Props)
    readonly bootstrapEvent?: Omit<BootstrapEvent.Props, keyof ComponentProps>;
}
