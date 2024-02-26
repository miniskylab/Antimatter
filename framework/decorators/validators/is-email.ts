import {isEmail, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function IsEmail(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsEmail",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isEmail(thisPropertyValue); },
                defaultMessage() { return ErrorMessage.PropsValidation.MustBeEmail; }
            }
        });
    };
}
