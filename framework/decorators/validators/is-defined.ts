import {isDefined, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function IsDefined(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsDefined",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isDefined(thisPropertyValue); },
                defaultMessage() { return ErrorMessage.PropsValidation.Required; }
            }
        });
    };
}
