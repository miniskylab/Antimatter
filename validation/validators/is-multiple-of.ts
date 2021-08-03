import {registerDecorator, ValidationArguments} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsMultipleOf(otherPropertyName: string)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsMultipleOf",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            constraints: [otherPropertyName],
            validator: {
                validate(thisPropertyValue: unknown, validationArguments: ValidationArguments)
                {
                    const otherPropertyValue = (validationArguments.object as Record<string, unknown>)[otherPropertyName];
                    if (typeof thisPropertyValue !== "number" || typeof otherPropertyValue !== "number")
                    {
                        return false;
                    }

                    let wholeNumberThisPropertyValue = thisPropertyValue;
                    let wholeNumberOtherPropertyValue = otherPropertyValue;
                    while (!Number.isInteger(wholeNumberThisPropertyValue) || !Number.isInteger(wholeNumberOtherPropertyValue))
                    {
                        wholeNumberThisPropertyValue *= 10;
                        wholeNumberOtherPropertyValue *= 10;
                    }

                    return wholeNumberThisPropertyValue % wholeNumberOtherPropertyValue === 0;
                },

                defaultMessage() { return ValidationMessageTemplate.MustBeMultipleOf; }
            }
        });
    };
}
