import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructure";
import {ClassConstructor} from "class-transformer";
import {DefaultImageMatrixVariant, ImageMatrixVariant} from "../variants";
import {ImageMatrixComponentProps} from "./image-matrix-component-props";
import {ImageMatrixExportProps} from "./image-matrix-export-props";

export class ImageMatrixExporter extends ComponentExporter<ImageMatrixExportProps>
{
    protected get PropsType(): ClassConstructor<ImageMatrixComponentProps>
    {
        return ImageMatrixComponentProps;
    }

    protected get DefaultProps(): Partial<ImageMatrixComponentProps>
    {
        return {
            images: []
        };
    }

    protected deserialize(imageMatrixExportProps: ImageMatrixExportProps): ImageMatrixExportProps
    {
        return {
            ...imageMatrixExportProps
        };
    }

    protected getVariant(imageMatrixExportProps: ImageMatrixExportProps): CSS
    {
        switch (Enum.getValue(ImageMatrixVariant, imageMatrixExportProps.variant))
        {
            case null:
            case undefined:
            case ImageMatrixVariant.Default:
                return DefaultImageMatrixVariant;

            default:
                return imageMatrixExportProps.variant as CSS;
        }
    }
}
