import {isBoolean, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function IsBoolean(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsBoolean",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isBoolean(thisPropertyValue); },
                defaultMessage() { return ErrorMessage.MustBeBoolean; }
            }
        });
    };
}
