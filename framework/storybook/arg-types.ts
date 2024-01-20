import {Ts} from "../functions";

export function styleSelector(anyObject: Record<string, unknown>): Record<string, unknown>
{
    const options = Object.keys(anyObject);

    const labelMapping: Record<string, string> = {};
    options.forEach(option => { labelMapping[option] = Ts.String.splitCamelCase(option); });

    const valueMapping: Record<string, unknown> = {};
    options.forEach(option => { valueMapping[option] = anyObject[option]; });

    return {
        options,
        mapping: valueMapping,
        control: {labels: labelMapping}
    };
}

export function enumDropdown(anyEnum: Record<string, string>)
{
    const anyEnumWithoutReverseMapping: typeof anyEnum = {};
    Object.keys(anyEnum)
        .filter(key => Number.isNaN(Number.parseInt(key)))
        .forEach(key => { anyEnumWithoutReverseMapping[key] = anyEnum[key]; });

    return {
        options: Object.values(anyEnumWithoutReverseMapping),
        control: {
            type: "select",
            labels: Object.fromEntries(Object.entries(anyEnumWithoutReverseMapping).map(entry =>
            {
                entry[0] = Ts.String.splitCamelCase(entry[0]);
                return entry.reverse();
            }))
        }
    };
}

export function number(min: number, max: number, step: number)
{
    return {
        control: {
            type: "number",
            min,
            max,
            step
        }
    };
}

export function rangeSlider(min: number, max: number, step: number)
{
    return {
        control: {
            type: "range",
            min,
            max,
            step
        }
    };
}

export function datePicker()
{
    return {
        control: {
            type: "date"
        }
    };
}

export function select()
{
    return {
        control: {
            type: "select"
        }
    };
}

export function text()
{
    return {
        control: {
            type: "text"
        }
    };
}

export const locked = {
    control: false
};
