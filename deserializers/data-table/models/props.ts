import {Props as DataTableProps, Variant} from "@miniskylab/antimatter-data-table";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<DataTableProps, {
    readonly variant?: keyof typeof Variant;
}>;
