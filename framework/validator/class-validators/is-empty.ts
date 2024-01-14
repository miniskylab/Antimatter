import {isEmpty, registerDecorator, ValidationOptions} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function IsEmpty(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsEmpty",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isEmpty(thisPropertyValue); },
                defaultMessage() { return ErrorMessages.MustBeEmpty; }
            }
        });
    };
}
