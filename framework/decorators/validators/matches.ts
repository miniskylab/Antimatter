import {matches, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function Matches(regex: string, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Matches",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown)
                {
                    return typeof thisPropertyValue === "string" && matches(thisPropertyValue, new RegExp(regex));
                },
                defaultMessage() { return ErrorMessage.PropsValidation.MustMatchRegex(regex); }
            }
        });
    };
}
