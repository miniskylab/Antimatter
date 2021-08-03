import {isPositive, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsPositive()
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsPositive",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isPositive(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.CannotBeLessThanOrEqualToValue; }
            }
        });
    };
}
