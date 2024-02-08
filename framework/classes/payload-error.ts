export class PayloadError<TPayload = unknown> extends Error
{
    readonly payload?: TPayload;

    private constructor() { super(); }

    static from<TPayload>(jsError: Error, payload?: TPayload): PayloadError<TPayload>
    {
        return {
            payload,
            name: jsError.name,
            message: jsError.message
        };
    }
}
