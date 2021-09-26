import {ComponentExporter, CSS} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {RapidDocComponentProps} from "./rapi-doc-component-props";
import {RapiDocExportProps} from "./rapi-doc-export-props";

export class RapiDocExporter extends ComponentExporter<RapiDocExportProps>
{
    protected get PropsType(): ClassConstructor<RapidDocComponentProps>
    {
        return RapidDocComponentProps;
    }

    protected get DefaultProps(): Partial<RapidDocComponentProps>
    {
        return {
            apiName: String.EMPTY
        };
    }

    protected deserialize(rapiDocExportProps: RapiDocExportProps): RapiDocExportProps
    {
        return {
            ...rapiDocExportProps
        };
    }

    protected getVariant(rapiDocExportProps: RapiDocExportProps): CSS
    {
        return rapiDocExportProps.variant as CSS;
    }
}
