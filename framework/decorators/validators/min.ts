import {min, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function Min(minValue: number, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Min",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return min(thisPropertyValue, minValue); },
                defaultMessage() { return ErrorMessage.CannotBeLessThanValue(minValue); }
            }
        });
    };
}
