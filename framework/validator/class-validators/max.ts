import {max, registerDecorator} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function Max(maxValue: number)
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Max",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return max(thisPropertyValue, maxValue); },
                defaultMessage() { return ErrorMessages.CannotBeGreaterThanValue(maxValue); }
            }
        });
    };
}
