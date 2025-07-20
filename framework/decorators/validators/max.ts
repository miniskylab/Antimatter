import {max, registerDecorator, ValidationOptions} from "class-validator";
import {ErrorMessage} from "../../consts";

export function Max(maxValue: number, validationOptions?: Omit<ValidationOptions, "message">)
{
    return function (objectContainingThisProperty: object, thisPropertyName: string): void
    {
        registerDecorator({
            name: "Max",
            target: objectContainingThisProperty.constructor,
            propertyName: thisPropertyName,
            options: validationOptions,
            validator: {
                validate(thisPropertyValue: unknown)
                {
                    return !Number.isFinite(thisPropertyValue as number) || max(thisPropertyValue, maxValue);
                },
                defaultMessage() { return ErrorMessage.PropsValidation.CannotBeGreaterThanValue(maxValue); }
            }
        });
    };
}
