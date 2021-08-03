import {IconName} from "antimatter/icon";
import {IsDefined, IsEnum, IsNotEmpty, IsString} from "antimatter/validation";

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
