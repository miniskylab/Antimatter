import {isEnum, isString, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessages} from "../error-messages";

export function IsEnum(anyEnum: unknown, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsEnum",
            target: classContainingThisProperty.constructor,
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
