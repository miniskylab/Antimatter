import {isNullOrUndefined, Ts} from "@miniskylab/antimatter-framework";

export function getReplayGainAdjustedVolume(dbAudioGain: number | null | undefined, rAudioPeak: number | null | undefined): number
{
    if (isNullOrUndefined(dbAudioGain) || isNullOrUndefined(rAudioPeak) || !Number.isFinite(dbAudioGain) || !Number.isFinite(rAudioPeak))
    {
        return 1;
    }

    let replayGainAdjustedVolume = Math.pow(10, dbAudioGain / 20);
    if (rAudioPeak > 0)
    {
        replayGainAdjustedVolume = Math.min(replayGainAdjustedVolume, 1 / rAudioPeak);
    }

    return Ts.Number.clamp(replayGainAdjustedVolume, 0, 1);
}
