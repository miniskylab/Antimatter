const Blue: RgbColor = [0, 160, 255];
const Green: RgbColor = [135, 172, 78];
const Gold: RgbColor = [255, 191, 71];
const Red: RgbColor = [255, 112, 71];
const Pink: RgbColor = [255, 71, 133];
const Purple: RgbColor = [147, 112, 219];

const White: RgbColor = [255, 255, 255];
const Gainsboro: RgbColor = [220, 220, 220];
const Neutral: RgbColor = [155, 155, 155];
const Gray: RgbColor = [128, 128, 128];
const Background: RgbColor = [50, 50, 50];
const Mineshaft: RgbColor = [40, 40, 40];
const Ambient: RgbColor = [30, 30, 30];
const Black: RgbColor = [0, 0, 0];

export const Color = {
    Blue: toHex(Blue),
    Blue__a10: toHex(Blue, 10),
    Blue__a45: toHex(Blue, 45),
    Blue__a65: toHex(Blue, 65),
    Blue__b10: toHex(shade(Blue, 10)),
    Blue__w25: toHex(tint(Blue, 25)),

    Green: toHex(Green),
    Green__a10: toHex(Green, 10),
    Green__a45: toHex(Green, 45),
    Green__b10: toHex(shade(Green, 10)),
    Green__w25: toHex(tint(Green, 25)),

    Gold: toHex(Gold),
    Gold__a10: toHex(Gold, 10),
    Gold__a45: toHex(Gold, 45),
    Gold__b10: toHex(shade(Gold, 10)),
    Gold__w25: toHex(tint(Gold, 25)),

    Red: toHex(Red),
    Red__a10: toHex(Red, 10),
    Red__a45: toHex(Red, 45),

    Pink: toHex(Pink),
    Pink__a10: toHex(Pink, 10),

    Purple: toHex(Purple),
    Purple__a10: toHex(Purple, 10),

    White: toHex(White),
    White__a10: toHex(White, 10),

    Gainsboro: toHex(Gainsboro),

    Neutral: toHex(Neutral),
    Neutral__a10: toHex(Neutral, 10),
    Neutral__b10: toHex(shade(Neutral, 10)),
    Neutral__w25: toHex(tint(Neutral, 25)),

    Gray: toHex(Gray),
    Gray__a10: toHex(Gray, 10),
    Gray__a65: toHex(Gray, 65),
    Gray__b10: toHex(shade(Gray, 10)),
    Gray__w25: toHex(tint(Gray, 25)),

    Background: toHex(Background),
    Mineshaft: toHex(Mineshaft),
    Ambient: toHex(Ambient),

    Black: toHex(Black),

    Transparent: toHex(Black, 0)
};

export type HexColorCode = `#${string}`;
export type RgbColor = [number, number, number];

export function tint(color: RgbColor | HexColorCode, factor: number): RgbColor
{
    if (typeof color === "string")
    {
        color = toRgb(color);
    }

    return [
        color[0] + (255 - color[0]) * (factor / 100),
        color[1] + (255 - color[1]) * (factor / 100),
        color[2] + (255 - color[2]) * (factor / 100)
    ];
}

export function shade(color: RgbColor | HexColorCode, factor: number): RgbColor
{
    if (typeof color === "string")
    {
        color = toRgb(color);
    }

    return [
        color[0] * (1 - factor / 100),
        color[1] * (1 - factor / 100),
        color[2] * (1 - factor / 100)
    ];
}

export function toHex(rgbColor: RgbColor, alpha = 100): HexColorCode
{
    return (
        "#" +
        (rgbColor[0] | 1 << 8).toString(16).slice(1) +
        (rgbColor[1] | 1 << 8).toString(16).slice(1) +
        (rgbColor[2] | 1 << 8).toString(16).slice(1) +
        ((alpha / 100 * 255) | 1 << 8).toString(16).slice(1)
    ).toUpperCase() as HexColorCode;
}

export function toRgb(hexColorCode: HexColorCode): RgbColor
{
    const shorthandHexColorCodeRegex = /^#([a-f\d])([a-f\d])([a-f\d])$/i;
    const normalizedHexColorCode = hexColorCode.replace(shorthandHexColorCodeRegex, (_match, r, g, b) => r + r + g + g + b + b);

    const rgbColor = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(normalizedHexColorCode);
    if (rgbColor !== null)
    {
        return [Number.parseInt(rgbColor[1], 16), Number.parseInt(rgbColor[2], 16), Number.parseInt(rgbColor[3], 16)];
    }

    throw new Error(`Invalid hex color code: ${hexColorCode}`);
}
