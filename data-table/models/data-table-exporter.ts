import {ComponentExporter, CSS, Enum} from "antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DataTableVariant, DefaultDataTableVariant} from "../variants";
import {DataTableComponentProps} from "./data-table-component-props";
import {DataTableExportProps} from "./data-table-export-props";
import {DataTableRow} from "./data-table-row";

export class DataTableExporter extends ComponentExporter<DataTableExportProps>
{
    protected get PropsType(): ClassConstructor<DataTableComponentProps>
    {
        return DataTableComponentProps;
    }

    protected get DefaultProps(): Partial<DataTableComponentProps>
    {
        return {
            rows: [] as DataTableRow[],
            headerRow: undefined,
            selectedRowId: undefined,
            addNewRow: undefined,
            rowCount: 15,
            maxColumnCount: undefined,
            pxMinColumnWidth: 570,
            onRowClicked: undefined,
            onSaveButtonClicked: undefined,
            onCancelButtonClicked: undefined,
            onDeleteButtonClicked: undefined
        };
    }

    protected deserialize(dataTableExportProps: DataTableExportProps): DataTableExportProps
    {
        return {
            ...dataTableExportProps
        };
    }

    protected getVariant(dataTableExportProps: DataTableExportProps): CSS
    {
        switch (Enum.getValue(DataTableVariant, dataTableExportProps.variant))
        {
            case null:
            case undefined:
            case DataTableVariant.Default:
                return DefaultDataTableVariant;

            default:
                return dataTableExportProps.variant as CSS;
        }
    }
}
