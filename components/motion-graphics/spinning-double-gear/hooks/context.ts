import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SpinningDoubleGearContext} from "../models";

export function useSpinningDoubleGearContext(): NonNullable<SpinningDoubleGearContext>
{
    return useContextOrThrow(SpinningDoubleGearContext);
}
