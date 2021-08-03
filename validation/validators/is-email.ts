import {isEmail, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsEmail()
{
    return function (targetContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsEmail",
            target: targetContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isEmail(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeEmail; }
            }
        });
    };
}
