import {ValidationMessageTemplate} from "@miniskylab/antimatter-class-validator";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {plainToClass} from "class-transformer";
import {validateSync, ValidationError} from "class-validator";
import {ComponentType, createElement} from "react";

export function withValidation<TProps extends ComponentProps<TProps["style"]>>(
    component: ComponentType<TProps>,
    PropsType: new () => TProps
): ComponentType<TProps>
{
    const validator: ComponentType<TProps> = (props: TProps): JSX.Element =>
    {
        return validateProps(props) ? createElement(component, props) : null;
        function validateProps(props: TProps): boolean
        {
            const errors = validateSync(
                plainToClass(
                    PropsType,
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
                getValidationErrorMessages(error).forEach(errorMessage =>
                {
                    const componentName = Decorator.getValue<string>(ComponentName, error.target);
                    console.error(`${ValidationMessageTemplate.PropsValidationErrorOccurred.format(componentName)} ${errorMessage}`);
                });

                function getValidationErrorMessages(validationError: ValidationError, parentPropertyName = String.EMPTY): string[]
                {
                    const errorMessages: string[] = [];
                    const hierarchicalPropertyName = parentPropertyName
                        ? `${parentPropertyName}.${validationError.property}`
                        : validationError.property;

                    if (validationError.constraints)
                    {
                        const propertyName = hierarchicalPropertyName.split(".").pop();
                        const propertyValue = (validationError.target as Record<string, unknown>)[propertyName];
                        Object.keys(validationError.constraints).forEach(x =>
                        {
                            const tokens: string[] = [hierarchicalPropertyName];
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
                            errorMessages.push(...getValidationErrorMessages(childValidationError, hierarchicalPropertyName));
                        });
                    }

                    return errorMessages;
                }
            });

            return !errors || errors.length === 0;
        }
    };

    validator.displayName = component.displayName;
    validator.defaultProps = component.defaultProps;
    return validator;
}
