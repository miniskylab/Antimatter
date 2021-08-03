import {max, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function Max(maxValue: number)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Max",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return max(thisPropertyValue, maxValue); },
                defaultMessage() { return ValidationMessageTemplate.CannotBeGreaterThanValue; }
            }
        });
    };
}
