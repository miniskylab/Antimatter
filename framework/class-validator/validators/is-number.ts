import {isNumber, IsNumberOptions, registerDecorator, ValidationOptions} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsNumber(options?: IsNumberOptions, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsNumber",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isNumber(thisPropertyValue, options); },
                defaultMessage() { return ValidationMessageTemplate.MustBeNumber; }
            }
        });
    };
}
