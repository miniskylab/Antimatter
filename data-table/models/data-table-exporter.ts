import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructure";
import {ClassConstructor} from "class-transformer";
import {DataTableVariant, DefaultDataTableVariant} from "../variants";
import {DataTableComponentProps} from "./data-table-component-props";
import {DataTableExportProps} from "./data-table-export-props";

export class DataTableExporter extends ComponentExporter<DataTableExportProps>
{
    protected get PropsType(): ClassConstructor<DataTableComponentProps>
    {
        return DataTableComponentProps;
    }

    protected get DefaultProps(): Partial<DataTableComponentProps>
    {
        return {
            headerRowCells: [],
            addNewRowText: undefined,
            records: [],
            selectedRecordId: undefined,
            rowCountPerPage: 15,
            maxPageCount: undefined,
            pxMinPageWidth: 570,
            onRowClick: undefined,
            onRecordSave: undefined,
            onRecordDraftDiscard: undefined,
            onRecordDelete: undefined
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
