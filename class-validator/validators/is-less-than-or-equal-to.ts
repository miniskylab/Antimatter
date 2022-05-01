import {isNumber, registerDecorator, ValidationArguments} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsLessThanOrEqualTo(otherPropertyName: string)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsLessThanOrEqualTo",
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
                        ? ValidationMessageTemplate.CannotCompareForInequality
                        : ValidationMessageTemplate.CannotBeGreaterThanOtherProperty;
                }
            }
        });
    };
}
