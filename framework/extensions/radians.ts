import {percentToRadians} from "./number";

export const Radians = new class
{
    fromPercent(pctValue: number): number
    {
        return percentToRadians(pctValue);
    }
};
