import {isNotEmpty, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsNotEmpty()
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsNotEmpty",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isNotEmpty(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.CannotBeEmptyString; }
            }
        });
    };
}
