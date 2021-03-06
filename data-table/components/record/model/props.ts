import {IsBoolean, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentProps} from "@miniskylab/antimatter-model";
import {IsArray, IsOptional} from "class-validator";
import {Cell} from "./cell";

export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    readonly cells?: Cell[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly editable?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: (recordId: number | string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSaveButtonClick?: (recordId: number | string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onCancelButtonClick?: (recordId: number | string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDeleteButtonClick?: (recordId: number | string) => void;
}
