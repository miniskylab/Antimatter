import {isHexColor, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function IsHexColor(validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "IsHexColor",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown) { return isHexColor(thisPropertyValue); },
                defaultMessage() { return ErrorMessage.PropsValidation.MustBeHexColor; }
            }
        });
    };
}
