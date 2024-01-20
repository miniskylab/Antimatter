import {max, registerDecorator} from "class-validator";
import {ErrorMessage} from "../../consts";

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
                defaultMessage() { return ErrorMessage.CannotBeGreaterThanValue(maxValue); }
            }
        });
    };
}
