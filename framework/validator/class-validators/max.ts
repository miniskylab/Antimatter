import {max, registerDecorator} from "class-validator";
import {ErrorMessages} from "../error-messages";

export function Max(maxValue: number)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Max",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return max(thisPropertyValue, maxValue); },
                defaultMessage() { return ErrorMessages.CannotBeGreaterThanValue(maxValue); }
            }
        });
    };
}
