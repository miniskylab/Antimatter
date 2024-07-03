import {isNumber, IsNumberOptions, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function IsNumber(options?: IsNumberOptions, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsNumber",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isNumber(thisPropertyValue, options); },
                defaultMessage() { return ErrorMessage.PropsValidation.MustBeNumber; }
            }
        });
    };
}
