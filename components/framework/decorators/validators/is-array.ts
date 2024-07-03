import {isArray, registerDecorator} from "class-validator";
import {ErrorMessage} from "../../consts";

export function IsArray()
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsArray",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isArray(thisPropertyValue); },
                defaultMessage() { return ErrorMessage.PropsValidation.MustBeArray; }
            }
        });
    };
}
