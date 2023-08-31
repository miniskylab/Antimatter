import {min, registerDecorator, ValidationOptions} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function Min(minValue: number, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Min",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return min(thisPropertyValue, minValue); },
                defaultMessage() { return ValidationMessageTemplate.CannotBeLessThanValue(minValue); }
            }
        });
    };
}
