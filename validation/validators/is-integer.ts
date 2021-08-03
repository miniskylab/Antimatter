import {isInt, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsInteger()
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsInteger",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isInt(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeInteger; }
            }
        });
    };
}
