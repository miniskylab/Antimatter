import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultTransitionVariant, TransitionVariant} from "../variants";
import {TransitionComponentProps} from "./transition-component-props";
import {TransitionExportProps} from "./transition-export-props";

export class TransitionExporter extends ComponentExporter<TransitionExportProps>
{
    protected get PropsType(): ClassConstructor<TransitionComponentProps>
    {
        return TransitionComponentProps;
    }

    protected get DefaultProps(): Partial<TransitionComponentProps>
    {
        return {
            msTimeout: undefined,
            childIdentifier: undefined,
            classNames: {
                appear: String.EMPTY,
                appearActive: String.EMPTY,
                appearDone: String.EMPTY,
                enter: String.EMPTY,
                enterActive: String.EMPTY,
                enterDone: String.EMPTY,
                exit: String.EMPTY,
                exitActive: String.EMPTY,
                exitDone: String.EMPTY
            }
        };
    }

    protected deserialize(transitionExportProps: TransitionExportProps): TransitionExportProps
    {
        return {
            ...transitionExportProps
        };
    }

    protected getVariant(transitionExportProps: TransitionExportProps): CSS
    {
        switch (Enum.getValue(TransitionVariant, transitionExportProps.variant))
        {
            case null:
            case undefined:
            case TransitionVariant.Default:
                return DefaultTransitionVariant;

            default:
                return transitionExportProps.variant as CSS;
        }
    }
}
