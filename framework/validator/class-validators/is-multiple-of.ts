import {registerDecorator, ValidationArguments} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function IsMultipleOf(otherPropertyName: string)
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
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

                defaultMessage() { return ErrorMessages.MustBeMultipleOf; }
            }
        });
    };
}
