export function rgba2hex(rgba: string): string
{
    const hexCode = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)$/)
        .slice(1)
        .map((rgbaToken, index) =>
        {
            const isAlphaToken = index === 3;
            return (isAlphaToken ? Math.round(parseFloat(rgbaToken) * 255) : parseFloat(rgbaToken))
                .toString(16)
                .padStart(2, "0")
                .replace("NaN", String.EMPTY);
        })
        .join(String.EMPTY)
        .toUpperCase();

    return `#${hexCode}`;
}
