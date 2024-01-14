import {min, registerDecorator, ValidationOptions} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function Min(minValue: number, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Min",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return min(thisPropertyValue, minValue); },
                defaultMessage() { return ErrorMessages.CannotBeLessThanValue(minValue); }
            }
        });
    };
}
