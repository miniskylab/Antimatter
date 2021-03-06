import {ExistsIn, IsBoolean, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";

@ComponentName("Dropdown Menu")
export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly keyValueSet?: Record<string, string>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ExistsIn("keyValueSet")
    @IsString()
    @IsOptional()
    readonly selectedKey?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly placeholderText?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly canRemoveSelection?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isOpenByDefault?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newlySelectedKey: string) => void;
}
