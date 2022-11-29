import {isEmpty, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsEmpty()
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsEmpty",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isEmpty(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeEmpty; }
            }
        });
    };
}
