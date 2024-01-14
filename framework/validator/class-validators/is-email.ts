import {isEmail, registerDecorator, ValidationOptions} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function IsEmail(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (targetContainingThisProperty: Class, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsEmail",
            target: targetContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isEmail(thisPropertyValue); },
                defaultMessage() { return ErrorMessages.MustBeEmail; }
            }
        });
    };
}
