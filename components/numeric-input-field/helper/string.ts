export function endWithDotAndZeros(anyString: string): boolean
{
    if (Object.isNullOrUndefined(anyString)) return false;
    return anyString.match(/^[^.]*\.0*$/g) !== null;
}

export function removeCosmeticCharacters(anyString: string): string
{
    return anyString.replace(/,/g, String.EMPTY)
        .replace(/^\+/g, String.EMPTY)
        .replace(/^-\+/g, "-");
}

export function removeNonDigitCharacters(anyString: string): string
{
    return anyString.replace(/\D/g, String.EMPTY);
}
