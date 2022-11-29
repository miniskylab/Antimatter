import {percentToRadians} from "./number";

export const Radians = new class
{
    FromPercent(pctValue: number): number
    {
        return percentToRadians(pctValue);
    }
};
