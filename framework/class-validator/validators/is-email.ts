import {isEmail, registerDecorator, ValidationOptions} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsEmail(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (targetContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsEmail",
            target: targetContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isEmail(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeEmail; }
            }
        });
    };
}
