import {isEnum, isString, registerDecorator, ValidationOptions} from "class-validator";
import {Enum} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function IsEnum(anyEnum: Enum, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsEnum",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown)
                {
                    return isEnum(thisPropertyValue, anyEnum) ||
                           (
                               isString(thisPropertyValue) &&
                               Object.keys(anyEnum).includes(thisPropertyValue)
                           );
                },

                defaultMessage() { return ErrorMessages.MustBeEnum; }
            }
        });
    };
}
