import {isNullOrUndefined, Ts} from "@miniskylab/antimatter-framework";

export function getReplayGainAdjustedVolume(dbAudioGain: number | null | undefined, rAudioPeak: number | null | undefined): number
{
    if (isNullOrUndefined(dbAudioGain) || isNullOrUndefined(rAudioPeak) || !Number.isFinite(dbAudioGain) || !Number.isFinite(rAudioPeak))
    {
        return 1;
    }

    let replayGainVolume = Math.pow(10, dbAudioGain / 20);
    if (rAudioPeak > 0)
    {
        replayGainVolume = Math.min(replayGainVolume, 1 / rAudioPeak);
    }

    return Ts.Number.clamp(replayGainVolume, 0, 1);
}
