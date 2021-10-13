import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructure";
import {ClassConstructor} from "class-transformer";
import {DefaultRecordVariant, RecordVariant} from "../variants";
import {RecordComponentProps} from "./record-component-props";
import {RecordExportProps} from "./record-export-props";

export class RecordExporter extends ComponentExporter<RecordExportProps>
{
    protected get PropsType(): ClassConstructor<RecordComponentProps>
    {
        return RecordComponentProps;
    }

    protected get DefaultProps(): Partial<RecordComponentProps>
    {
        return {
            cellData: [],
            onClick: undefined
        };
    }

    protected deserialize(recordExportProps: RecordExportProps): RecordExportProps
    {
        return {
            ...recordExportProps
        };
    }

    protected getVariant(recordExportProps: RecordExportProps): CSS
    {
        switch (Enum.getValue(RecordVariant, recordExportProps.variant))
        {
            case null:
            case undefined:
            case RecordVariant.Default:
                return DefaultRecordVariant;

            default:
                return recordExportProps.variant as CSS;
        }
    }
}
