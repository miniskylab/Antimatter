import {isString, registerDecorator, ValidationOptions} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsString(validationOptions?: ValidationOptions)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsString",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isString(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeString; }
            }
        });
    };
}
