import {min, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function Min(minValue: number)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Min",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return min(thisPropertyValue, minValue); },
                defaultMessage() { return ValidationMessageTemplate.CannotBeLessThanValue(minValue); }
            }
        });
    };
}
