import {isArray, registerDecorator} from "class-validator";
import {Class} from "../../predefined";
import {ErrorMessages} from "../error-messages";

export function IsArray()
{
    return function (classContainingThisProperty: Class, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsArray",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isArray(thisPropertyValue); },
                defaultMessage() { return ErrorMessages.MustBeArray; }
            }
        });
    };
}
