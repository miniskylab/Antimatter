import {arrayNotEmpty, registerDecorator} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function ArrayNotEmpty()
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
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
