import {plainToClass} from "class-transformer";
import {validateSync, ValidationError} from "class-validator";
import {
    ComponentType,
    createElement,
    forwardRef,
    ForwardRefExoticComponent,
    JSX,
    MutableRefObject,
    PropsWithoutRef,
    RefAttributes
} from "react";
import {ComponentProps} from "../classes";
import {EMPTY_STRING, ErrorMessage, Reflection} from "../consts";
import {ComponentName} from "../decorators";
import {Ts} from "../functions";

export function withValidation<TProps extends ComponentProps<TProps["style"]>>(
    component: ComponentType<TProps>,
    propsType: new () => TProps
): ForwardRefExoticComponent<PropsWithoutRef<TProps> & RefAttributes<unknown>>
{
    const validator = forwardRef((props: TProps, ref: MutableRefObject<unknown>): JSX.Element | null =>
    {
        return validateProps(props) ? createElement(component, {...props, ref}) : null;
        function validateProps(props: TProps): boolean
        {
            const errors = validateSync(
                plainToClass(
                    propsType,
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
                    const componentName = Reflection.getDecoratorValue<string>(ComponentName, error.target);
                    console.error(`${Ts.String.format(ErrorMessage.PropsValidationErrorOccurred, componentName)} ${errorMessage}`);
                });

                function getValidationErrorMessages(validationError: ValidationError, parentPropertyName = EMPTY_STRING): string[]
                {
                    const errorMessages: string[] = [];
                    const hierarchicalPropertyName = parentPropertyName
                        ? `${parentPropertyName}.${validationError.property}`
                        : validationError.property;

                    if (validationError.constraints)
                    {
                        const propertyName = hierarchicalPropertyName.split(".").pop();
                        if (!propertyName)
                        {
                            throw new Error("'propertyName' variable is not expected to be empty string, null or undefined here");
                        }

                        const propertyValue = (validationError.target as Record<string, unknown>)[propertyName];
                        for (const constraintId of Object.keys(validationError.constraints))
                        {
                            const tokens: string[] = [hierarchicalPropertyName];
                            const targetPropertyNames: string[] = (validationError.contexts?.[constraintId]?.["targetPropertyNames"] || []);

                            tokens.push(...targetPropertyNames, Ts.Object.getRepresentationString(propertyValue));
                            targetPropertyNames.forEach((x: string) =>
                            {
                                const targetPropertyValue = (validationError.target as Record<string, unknown>)[x];
                                tokens.push(Ts.Object.getRepresentationString(targetPropertyValue));
                            });

                            const errorMessageTemplate = validationError.constraints[constraintId];
                            errorMessages.push(Ts.String.format(errorMessageTemplate, ...tokens));
                        }
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
    });

    validator.displayName = component.displayName;
    return validator;
}
