const Blue = [0, 160, 255];
const Green = [135, 172, 78];
const Gold = [255, 191, 71];
const Tomato = [255, 112, 71];
const Coral = [255, 71, 133];
const Purple = [147, 112, 219];

const White = [255, 255, 255];
const Gainsboro = [220, 220, 220];
const Neutral = [155, 155, 155];
const Gray = [128, 128, 128];
const Background = [50, 50, 50];
const Mineshaft = [40, 40, 40];
const Ambient = [30, 30, 30];
const Black = [0, 0, 0];

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

    Tomato: toHex(Tomato),
    Tomato__a10: toHex(Tomato, 10),
    Tomato__a45: toHex(Tomato, 45),

    Coral: toHex(Coral),
    Coral__a10: toHex(Coral, 10),

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

function tint(color: number[], factor: number): number[]
{
    return [
        color[0] + (255 - color[0]) * (factor / 100),
        color[1] + (255 - color[1]) * (factor / 100),
        color[2] + (255 - color[2]) * (factor / 100)
    ];
}

function shade(color: number[], factor: number): number[]
{
    return [
        color[0] * (1 - factor / 100),
        color[1] * (1 - factor / 100),
        color[2] * (1 - factor / 100)
    ];
}

function toHex(color: number[], alpha = 100): HexColorCode
{
    return (
        "#" +
        (color[0] | 1 << 8).toString(16).slice(1) +
        (color[1] | 1 << 8).toString(16).slice(1) +
        (color[2] | 1 << 8).toString(16).slice(1) +
        ((alpha / 100 * 255) | 1 << 8).toString(16).slice(1)
    ).toUpperCase() as HexColorCode;
}
