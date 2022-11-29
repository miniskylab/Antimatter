import {isBoolean, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsBoolean()
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsBoolean",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isBoolean(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeBoolean; }
            }
        });
    };
}
