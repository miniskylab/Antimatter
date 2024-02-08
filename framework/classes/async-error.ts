import {Ts} from "../functions";

export class AsyncError<TPayload = unknown>
{
    readonly payload?: TPayload;
    readonly jsError: object | string;

    private constructor() { /* Do nothing! */ }

    static from<TPayload>(jsError: Error | string, payload?: TPayload): AsyncError<TPayload>
    {
        return {
            payload,
            jsError: Ts.Error.toSerializable(jsError)
        };
    }
}
