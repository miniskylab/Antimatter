import {isDefined, isObject, isString, registerDecorator, ValidationArguments} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function ExistsIn(otherPropertyName: string)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "ExistsIn",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            constraints: [otherPropertyName],
            options: {
                context: {
                    targetPropertyNames: [otherPropertyName]
                }
            },
            validator: {
                validate(thisPropertyValue: unknown, validationArguments: ValidationArguments): boolean
                {
                    const otherPropertyValue = (validationArguments.object as Record<string, unknown>)[otherPropertyName];

                    return (
                        (isDefined(thisPropertyValue) && isString(thisPropertyValue))
                        &&
                        (isDefined(otherPropertyValue) && isObject(otherPropertyValue))
                        &&
                        Object.keys(otherPropertyValue).includes(thisPropertyValue)
                    );
                },

                defaultMessage(validationArguments: ValidationArguments): string
                {
                    const thisPropertyValue = validationArguments.value;
                    const otherPropertyValue = (validationArguments.object as Record<string, unknown>)[otherPropertyName];

                    return (
                        (!isDefined(thisPropertyValue) || !isString(thisPropertyValue))
                        ||
                        (!isDefined(otherPropertyValue) || !isObject(otherPropertyValue))
                            ? ValidationMessageTemplate.CannotDetermineExistence
                            : ValidationMessageTemplate.DoesNotExistIn
                    );
                }
            }
        });
    };
}
