import {isInt, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function IsInteger(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsInteger",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isInt(thisPropertyValue); },
                defaultMessage() { return ErrorMessage.PropsValidation.MustBeInteger; }
            }
        });
    };
}
