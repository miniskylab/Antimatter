import {arrayNotEmpty, registerDecorator} from "class-validator";
import {ErrorMessage} from "../../consts";

export function ArrayNotEmpty()
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "ArrayNotEmpty",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return arrayNotEmpty(thisPropertyValue); },
                defaultMessage() { return ErrorMessage.CannotBeEmptyArray; }
            }
        });
    };
}
