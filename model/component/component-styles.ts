export function bem(selector: string, element: string = String.EMPTY, modifier: string = String.EMPTY): string
{
    if (!selector)
    {
        return String.EMPTY;
    }

    function validateSelector(
        anySelector: string,
        onTooManyElementError: (elementCount: number, individualSelector: string) => void,
        onTooManyModifierError: (modifierCount: number, individualSelector: string) => void
    )
    {
        anySelector.split(" ").forEach(individualSelector =>
        {
            const elementCount = (individualSelector.match(/__/g) || []).length;
            if (elementCount > 1)
            {
                onTooManyElementError(elementCount, individualSelector);
            }

            const modifierCount = (individualSelector.match(/--/g) || []).length;
            if (modifierCount > 1)
            {
                onTooManyModifierError(modifierCount, individualSelector);
            }
        });
    }

    const [block, ...supportSelectors] = normalizeSelector();
    function normalizeSelector(): string[]
    {
        const classSelectors = selector.split(" ");
        for (let i = 0; i < classSelectors.length; i++)
        {
            validateSelector(
                classSelectors[i],
                elementCount =>
                {
                    throw Error(`Only 1 element is allowed per BEM selector. Got: ${elementCount}, Selector: ${classSelectors[i]}`);
                },
                modifierCount =>
                {
                    throw Error(`Only 1 modifier is allowed per BEM selector. Got: ${modifierCount}, Selector: ${classSelectors[i]}`);
                }
            );

            const [block, modifier] = classSelectors[i].split("--");

            classSelectors[i] = block;
            if (modifier && modifier.length > 0)
            {
                classSelectors[i] += ` ${block}--${modifier}`;
            }
        }

        return [...new Set(classSelectors.join(" ").split(" "))];
    }

    let bemSelector = block;
    if (element)
    {
        bemSelector += `__${element}`;
    }

    if (modifier)
    {
        bemSelector += ` ${bemSelector}--${modifier}`;
    }

    if (!element && supportSelectors && supportSelectors.length > 0)
    {
        bemSelector += ` ${supportSelectors.join(" ")}`;
    }

    validateSelector(
        bemSelector,
        () =>
        {
            throw Error(
                `Attaching element to selector created invalid result. ` +
                `Selector: ${selector}, Element: ${element}, Result: ${bemSelector}`
            );
        },
        () =>
        {
            throw Error(
                `Attaching modifier to selector created invalid result. ` +
                `Selector: ${selector}, Element: ${element}, Modifier: ${modifier}, Result: ${bemSelector}`
            );
        }
    );

    return bemSelector;
}
