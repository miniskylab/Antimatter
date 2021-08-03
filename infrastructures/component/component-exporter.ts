import {ValidationMessageTemplate} from "antimatter/validation";
import {ClassConstructor, plainToClass} from "class-transformer";
import {validateSync, ValidationError} from "class-validator";
import {ComponentType, createElement} from "react";
import {Decorator} from "../helpers/decorator";
import {CSS} from "../models/css";
import {ComponentName} from "./component-name";
import {ComponentProps} from "./component-props";

export abstract class ComponentExporter<TExportProps extends Record<string, unknown>>
{
    protected abstract get PropsType(): ClassConstructor<ComponentProps>;

    protected abstract get DefaultProps(): Partial<ComponentProps>;

    export(component: ComponentType<ComponentProps>): ComponentType<TExportProps>
    {
        component.defaultProps = this.DefaultProps;

        let exportComponent: ComponentType<TExportProps> = (exportProps: TExportProps): JSX.Element =>
        {
            exportProps = {
                ...this.DefaultProps,
                ...Object.removeUndefinedProperties(exportProps)
            } as TExportProps;

            const deserializedProps: TExportProps = this.deserialize(exportProps);
            const props: ComponentProps = {
                ...deserializedProps,
                variant: this.getVariant(deserializedProps)
            };

            return this.validate(props)
                ? createElement(component, props)
                : null;
        };

        this.getHigherOrderComponents().forEach(x => { exportComponent = x(exportComponent); });

        exportComponent.displayName = component.displayName?.replace(/Component$/g, String.EMPTY);
        return exportComponent;
    }

    protected getHigherOrderComponents?(): ((component: ComponentType<TExportProps>) => ComponentType<TExportProps>)[]
    {
        return [];
    }

    protected abstract deserialize(exportProps: TExportProps): TExportProps;

    protected abstract getVariant(exportProps: TExportProps): CSS;

    private validate(props: ComponentProps): boolean
    {
        const errors = validateSync(
            plainToClass(
                this.PropsType,
                props,

                /**
                 * https://github.com/typestack/class-transformer/issues/596
                 *
                 * During transformation, whenever a property is a function or a class, plainToClass() will attempt to invoke it, which,
                 * in case of function, results in erratic, unexpected behavior and in case of class, it triggers an error.
                 *
                 * To workaround this issue, I added an option to excludes all properties that start with:
                 * - "on": which indicates they are functions
                 * - "children": which indicates they are classes or functions (child react components)
                 * - other special cases
                 *
                 * Current [class-transformer] version: 0.4.0
                 * TODO: Remove the below line of code when new version of [class-transformer] is released
                 */
                {excludePrefixes: ["on", "children", "componentType"]}
            )
        );

        errors.forEach(error =>
        {
            this.getErrorMessages(error).forEach(errorMessage =>
            {
                const componentName = Decorator.getValue(ComponentName, error.target) as string;
                console.error(`${ValidationMessageTemplate.PropsValidationErrorOccurred.format(componentName)} ${errorMessage}`);
            });
        });

        return !errors || errors.length === 0;
    }

    private getErrorMessages(validationError: ValidationError, parentPropertyName = String.EMPTY): string[]
    {
        const errorMessages: string[] = [];
        const propertyName = parentPropertyName ? `${parentPropertyName}.${validationError.property}` : validationError.property;
        const propertyValue = (validationError.target as Record<string, unknown>)[propertyName];

        if (validationError.constraints)
        {
            Object.keys(validationError.constraints).forEach(x =>
            {
                const tokens: string[] = [propertyName];
                const targetPropertyNames = (validationError.contexts?.[x]?.targetPropertyNames || []) as string[];

                tokens.push(...targetPropertyNames, Object.toRepresentationString(propertyValue));
                targetPropertyNames.forEach((x: string) =>
                {
                    const targetPropertyValue = (validationError.target as Record<string, unknown>)[x];
                    tokens.push(Object.toRepresentationString(targetPropertyValue));
                });

                const errorMessageTemplate = validationError.constraints[x];
                errorMessages.push(errorMessageTemplate.format(...tokens));
            });
        }

        if (validationError.children && validationError.children.length > 0)
        {
            validationError.children.forEach(childValidationError =>
            {
                errorMessages.push(...this.getErrorMessages(childValidationError, propertyName));
            });
        }

        return errorMessages;
    }
}
