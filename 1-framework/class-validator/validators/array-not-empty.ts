import {arrayNotEmpty, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function ArrayNotEmpty()
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "ArrayNotEmpty",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return arrayNotEmpty(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.CannotBeEmptyArray; }
            }
        });
    };
}
