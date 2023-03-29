import {isBoolean, registerDecorator, ValidationOptions} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsBoolean(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsBoolean",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isBoolean(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeBoolean; }
            }
        });
    };
}
