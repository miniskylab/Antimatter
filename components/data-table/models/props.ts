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
     * Specify the text that provides a succinct description of the content of the data table.
     */
    @IsString()
    @IsDefined()
    readonly title: string;


    /**
     * Specify the text that clarifies or provides context to the title.
     */
    @IsString()
    @IsOptional()
    readonly subtitle?: string;


    /**
     * Specify all columns of the data table.
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Row.Column)
    readonly columns: Row.Column[];


    /**
     * Specify all rows of the data table.
     */
    @IsOptional()
    readonly rows?: Record<string, Row.Data>;


    /**
     * Specify the selected row of the data table.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SelectedRow)
    readonly selectedRow?: SelectedRow;


    /**
     * Specify the way the data table operates or behaves.
     *
     * @type Row.Mode
     */
    @IsEnum(Row.Mode)
    @IsOptional()
    readonly mode?: Row.Mode;


    /**
     * When there aren't enough data rows, empty rows will be inserted into the data table to make sure the total number of rows is never
     * less than this number.
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly minRowCount?: number;


    /**
     * Specify the piece of code that will be executed when the data table changes mode.
     */
    readonly onSwitchMode: (newMode: Row.Mode) => void;


    /**
     * Specify the piece of code that will be executed when data of the selected row changes.
     */
    readonly onChangeRow: (newData: Row.Data) => void;


    /**
     * Specify the piece of code that will be executed when a row is selected.
     */
    readonly onSelectRow: (rowId: string) => void;


    /**
     * Specify the piece of code that will be executed when a new row is added to the data table.
     */
    readonly onAddNewRow: GestureResponderEventHandler;


    /**
     * Specify the piece of code that will be executed when changes made to data of the selected row are saved.
     */
    readonly onSaveRow: GestureResponderEventHandler;


    /**
     * Specify the piece of code that will be executed when the selected row is deleted from the data table.
     */
    readonly onDeleteRow: GestureResponderEventHandler;


    /**
     * Specify the piece of code that will be executed when changes made to data of the selected row are discarded.
     */
    readonly onCancel: GestureResponderEventHandler;
}
