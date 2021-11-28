class _Radians
{
    fromPercent(pctValue: number): number
    {
        return pctValue.percentToRadians();
    }
}

export const Radians = new _Radians();
