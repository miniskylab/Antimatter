import {ValidationMessageTemplate} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {ClassConstructor, plainToClass} from "class-transformer";
import {validateSync, ValidationError} from "class-validator";
import {ComponentType, createElement} from "react";
import {SerializedProps} from "./serialized-props";

export abstract class DeserializerCreator<TSerializedProps extends SerializedProps<ComponentProps>>
{
    protected abstract get PropsType(): ClassConstructor<ComponentProps>;

    createFrom(component: ComponentType<ComponentProps>): ComponentType<TSerializedProps>
    {
        const deserializer: ComponentType<TSerializedProps> = (serializedProps: TSerializedProps): JSX.Element =>
        {
            const props: ComponentProps = this.deserialize(serializedProps);
            return this.validateProps(props)
                ? createElement(component, props)
                : null;
        };

        deserializer.displayName = component.displayName?.replace(/Component$/g, String.EMPTY);
        return deserializer;
    }

    protected abstract deserialize(serializedProps: TSerializedProps): ComponentProps;

    private validateProps(props: ComponentProps): boolean
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
                 * - "dispatch": which indicates they are Redux's dispatch function
                 * - other special cases
                 *
                 * Current [class-transformer] version: 0.4.0
                 * TODO: Remove the below line of code when new version of [class-transformer] is released
                 */
                {excludePrefixes: ["on", "children", "dispatch", "componentType"]}
            )
        );

        errors.forEach(error =>
        {
            this.getValidationErrorMessages(error).forEach(errorMessage =>
            {
                const componentName = Decorator.getValue<string>(ComponentName, error.target);
                console.error(`${ValidationMessageTemplate.PropsValidationErrorOccurred.format(componentName)} ${errorMessage}`);
            });
        });

        return !errors || errors.length === 0;
    }

    private getValidationErrorMessages(validationError: ValidationError, parentPropertyName = String.EMPTY): string[]
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
                errorMessages.push(...this.getValidationErrorMessages(childValidationError, propertyName));
            });
        }

        return errorMessages;
    }
}
