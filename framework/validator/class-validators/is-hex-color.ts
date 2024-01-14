import {isHexColor, registerDecorator, ValidationOptions} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function IsHexColor(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsHexColor",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isHexColor(thisPropertyValue); },
                defaultMessage() { return ErrorMessages.MustBeHexColor; }
            }
        });
    };
}
