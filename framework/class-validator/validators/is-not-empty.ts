import {isNotEmpty, registerDecorator, ValidationOptions} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsNotEmpty(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsNotEmpty",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isNotEmpty(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.CannotBeEmptyString; }
            }
        });
    };
}
