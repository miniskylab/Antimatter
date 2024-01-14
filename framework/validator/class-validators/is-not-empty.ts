import {isNotEmpty, registerDecorator, ValidationOptions} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function IsNotEmpty(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsNotEmpty",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isNotEmpty(thisPropertyValue); },
                defaultMessage() { return ErrorMessages.CannotBeEmptyString; }
            }
        });
    };
}
