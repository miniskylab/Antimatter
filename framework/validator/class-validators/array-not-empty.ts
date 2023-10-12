import {arrayNotEmpty, registerDecorator} from "class-validator";
import {ErrorMessages} from "../error-messages";

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
                defaultMessage() { return ErrorMessages.CannotBeEmptyArray; }
            }
        });
    };
}
