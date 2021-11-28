import {isNumber, IsNumberOptions, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsNumber(options?: IsNumberOptions)
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsNumber",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isNumber(thisPropertyValue, options); },
                defaultMessage() { return ValidationMessageTemplate.MustBeNumber; }
            }
        });
    };
}
