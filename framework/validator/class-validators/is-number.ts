import {isNumber, IsNumberOptions, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessages} from "../error-messages";

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
                defaultMessage() { return ErrorMessages.MustBeNumber; }
            }
        });
    };
}