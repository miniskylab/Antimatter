const Blue = [0, 160, 255];
const Green = [135, 172, 78];
const Gold = [255, 191, 71];
const Tomato = [255, 112, 71];
const Coral = [255, 71, 133];
const Purple = [137, 89, 168];

const Primary = Blue;
const Secondary = Green;
const Tertiary = Coral;
const Complementary = complement(Primary);
const Positive = Green;
const Warning = Gold;
const Negative = Tomato;
const Accent = Purple;

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
    Gold: toHex(Gold),

    Green: toHex(Green),
    Green__b10: toHex(shade(Green, 10)),
    Green__w25: toHex(tint(Green, 25)),

    Coral: toHex(Coral),
    Coral__a10: toHex(Coral, 10),

    Tomato: toHex(Tomato),
    Tomato__a10: toHex(Tomato, 10),

    Purple: toHex(Purple),

    Primary: toHex(Primary),
    Primary__a10: toHex(Primary, 10),
    Primary__a45: toHex(Primary, 45),
    Primary__a65: toHex(Primary, 65),
    Primary__b10: toHex(shade(Primary, 10)),
    Primary__w25: toHex(tint(Primary, 25)),

    Secondary: toHex(Secondary),
    Secondary__a10: toHex(Secondary, 10),
    Secondary__b10: toHex(shade(Secondary, 10)),
    Secondary__w25: toHex(tint(Secondary, 25)),

    Tertiary: toHex(Tertiary),

    Complementary: toHex(Complementary),
    Complementary__a10: toHex(Complementary, 10),
    Complementary__a45: toHex(Complementary, 45),

    Positive: toHex(Positive),
    Positive__a10: toHex(Positive, 10),
    Positive__a45: toHex(Positive, 45),
    Positive__b10: toHex(shade(Positive, 10)),
    Positive__w25: toHex(tint(Positive, 25)),

    Warning: toHex(Warning),
    Warning__a10: toHex(Warning, 10),
    Warning__a45: toHex(Warning, 45),
    Warning__b10: toHex(shade(Warning, 10)),
    Warning__w25: toHex(tint(Warning, 25)),

    Negative: toHex(Negative),
    Negative__a10: toHex(Negative, 10),
    Negative__a45: toHex(Negative, 45),

    Accent: toHex(Accent),
    Accent__a10: toHex(Accent, 10),

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

function complement(color: number[]): number[]
{
    return [
        255 - color[0],
        255 - color[1],
        255 - color[2]
    ];
}

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
