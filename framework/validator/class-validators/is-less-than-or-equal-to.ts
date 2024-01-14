import {isNumber, registerDecorator, ValidationArguments} from "class-validator";
import {ErrorMessages} from "../error-messages";

export function IsLessThanOrEqualTo(otherPropertyName: string)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsLessThanOrEqualTo",
            target: objectContainingThisProperty.constructor,
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
                        isNumber(thisPropertyValue) &&
                        isNumber(otherPropertyValue) &&
                        thisPropertyValue <= otherPropertyValue
                    );
                },

                defaultMessage(validationArguments: ValidationArguments): string
                {
                    const thisPropertyValue = validationArguments.value;
                    const otherPropertyValue = (validationArguments.object as Record<string, unknown>)[otherPropertyName];

                    return !isNumber(thisPropertyValue) || !isNumber(otherPropertyValue)
                        ? ErrorMessages.CannotCompareForInequality
                        : ErrorMessages.CannotBeGreaterThanOtherProperty;
                }
            }
        });
    };
}
