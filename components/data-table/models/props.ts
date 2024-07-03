import {
    ArrayNotEmpty,
    ComponentName,
    ComponentProps,
    GestureResponderEventHandler,
    IsArray,
    IsDefined,
    IsEnum,
    IsInteger,
    IsPositive,
    IsString
} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {SelectedRow} from "../classes";
import {Row} from "../components";
import {type DataTableStyle} from "./style";

@ComponentName("Data Table")
export class DataTableProps extends ComponentProps<DataTableStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsDefined()
    readonly title: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly subtitle?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Row.Column)
    readonly columns: Row.Column[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly rows?: Record<string, Row.Data>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SelectedRow)
    readonly selectedRow?: SelectedRow;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Row.Mode
     */
    @IsEnum(Row.Mode)
    @IsOptional()
    readonly mode?: Row.Mode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly minRowCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSwitchMode: (newMode: Row.Mode) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChangeRow: (newData: Row.Data) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectRow: (rowId: string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onAddNewRow: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSaveRow: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDeleteRow: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onCancel: GestureResponderEventHandler;
}
