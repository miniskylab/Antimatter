import {isDefined, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsDefined()
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsDefined",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isDefined(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.Required; }
            }
        });
    };
}
