const Blue = [0, 160, 255];
const Green = [135, 172, 78];
const Gold = [255, 191, 71];
const Tomato = [255, 112, 71];
const Purple = [137, 89, 168];

const Primary = Blue;
const Secondary = Green;
const Tertiary = [255, 71, 133];
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
    Blue: toCssRgba(Blue),
    Green: toCssRgba(Green),
    Gold: toCssRgba(Gold),
    Tomato: toCssRgba(Tomato),
    Purple: toCssRgba(Purple),

    Primary: toCssRgba(Primary),
    Primary__a10: toCssRgba(Primary, 10),
    Primary__a45: toCssRgba(Primary, 45),
    Primary__a65: toCssRgba(Primary, 65),
    Primary__b10: toCssRgba(shade(Primary, 10)),
    Primary__w25: toCssRgba(tint(Primary, 25)),

    Secondary: toCssRgba(Secondary),
    Secondary__a10: toCssRgba(Secondary, 10),

    Tertiary: toCssRgba(Tertiary),

    Complementary: toCssRgba(Complementary),
    Complementary__a10: toCssRgba(Complementary, 10),
    Complementary__a45: toCssRgba(Complementary, 45),

    Positive: toCssRgba(Positive),
    Positive__a10: toCssRgba(Positive, 10),
    Positive__a45: toCssRgba(Positive, 45),
    Positive__b10: toCssRgba(shade(Positive, 10)),
    Positive__w25: toCssRgba(tint(Positive, 25)),

    Warning: toCssRgba(Warning),
    Warning__a10: toCssRgba(Warning, 10),
    Warning__a45: toCssRgba(Warning, 45),
    Warning__b10: toCssRgba(shade(Warning, 10)),
    Warning__w25: toCssRgba(tint(Warning, 25)),

    Negative: toCssRgba(Negative),
    Negative__a10: toCssRgba(Negative, 10),
    Negative__a45: toCssRgba(Negative, 45),

    Accent: toCssRgba(Accent),
    Accent__a10: toCssRgba(Accent, 10),

    White: toCssRgba(White),
    White__a3: toCssRgba(White, 3),
    White__a4: toCssRgba(White, 4),
    White__a5: toCssRgba(White, 5),
    White__a8: toCssRgba(White, 8),
    White__a10: toCssRgba(White, 10),
    White__a30: toCssRgba(White, 30),
    White__a50: toCssRgba(White, 50),

    Gainsboro: toCssRgba(Gainsboro),

    Neutral: toCssRgba(Neutral),
    Neutral__a10: toCssRgba(Neutral, 10),

    Gray: toCssRgba(Gray),
    Gray__a10: toCssRgba(Gray, 10),
    Gray__a65: toCssRgba(Gray, 65),

    Background: toCssRgba(Background),
    Mineshaft: toCssRgba(Mineshaft),
    Ambient: toCssRgba(Ambient),

    Black: toCssRgba(Black),
    Black__a15: toCssRgba(Black, 15),
    Black__a25: toCssRgba(Black, 25),
    Black__a35: toCssRgba(Black, 35),

    Transparent: toCssRgba(Black, 0)
};

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

function toCssRgba(color: number[], alpha = 100): string
{
    return `rgba(${color.join(", ")}, ${alpha / 100})`;
}
