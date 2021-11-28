import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {DefaultHeaderVariant, HeaderVariant, MiniHeaderVariant, SesquialteralHeaderVariant} from "../variants";
import {HeaderComponentProps} from "./header-component-props";
import {HeaderExportProps} from "./header-export-props";

export class HeaderExporter extends ComponentExporter<HeaderExportProps>
{
    protected get PropsType(): ClassConstructor<HeaderComponentProps>
    {
        return HeaderComponentProps;
    }

    protected get DefaultProps(): Partial<HeaderComponentProps>
    {
        return {
            headline: String.EMPTY,
            onPrevClicked: undefined,
            onNextClicked: undefined,
            onHeadlineClicked: undefined
        };
    }

    protected deserialize(headerExportProps: HeaderExportProps): HeaderExportProps
    {
        return {
            ...headerExportProps
        };
    }

    protected getVariant(headerExportProps: HeaderExportProps): ComponentStyles
    {
        switch (Enum.getValue(HeaderVariant, headerExportProps.variant))
        {
            case HeaderVariant.Mini:
                return MiniHeaderVariant;

            case null:
            case undefined:
            case HeaderVariant.Default:
                return DefaultHeaderVariant;

            case HeaderVariant.Sesquialteral:
                return SesquialteralHeaderVariant;

            default:
                return headerExportProps.variant as ComponentStyles;
        }
    }
}
