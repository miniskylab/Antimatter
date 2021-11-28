import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {IconName} from "@miniskylab/antimatter-icon";

export class TimelineBootstrapEvent
{
    /**
     *
     */
    @IsEnum(IconName)
    @IsDefined()
    readonly icon: IconName;


    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly description: string;
}
