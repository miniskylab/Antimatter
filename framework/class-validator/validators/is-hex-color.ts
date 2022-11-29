import {isHexColor, registerDecorator} from "class-validator";
import {ValidationMessageTemplate} from "../validation-message-template";

export function IsHexColor()
{
    return function (classContainingThisProperty: unknown, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsHexColor",
            target: classContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            validator: {
                validate(thisPropertyValue: unknown) { return isHexColor(thisPropertyValue); },
                defaultMessage() { return ValidationMessageTemplate.MustBeHexColor; }
            }
        });
    };
}
