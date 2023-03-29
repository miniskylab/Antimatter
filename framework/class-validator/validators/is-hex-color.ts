import {isHexColor, registerDecorator, ValidationOptions} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsHexColor(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsHexColor",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isHexColor(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeHexColor; }
            }
        });
    };
}
