import {isInt, registerDecorator, ValidationOptions} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsInteger(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsInteger",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isInt(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeInteger; }
            }
        });
    };
}
