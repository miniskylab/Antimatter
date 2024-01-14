import {isInt, registerDecorator, ValidationOptions} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function IsInteger(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsInteger",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isInt(thisPropertyValue); },
                defaultMessage() { return ErrorMessages.MustBeInteger; }
            }
        });
    };
}
