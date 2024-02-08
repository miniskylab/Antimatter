import {AsyncTaskStatus} from "../enums";
import {isNotNullAndUndefined} from "../functions";
import {PayloadError} from "./payload-error";

export class AsyncTask
{
    readonly id: string;
    status: AsyncTaskStatus;
    error?: PayloadError;

    private constructor() { /* Do nothing! */ }

    static deriveIdFrom(...anyStrings: (string | undefined)[]): string
    {
        return anyStrings.filter(isNotNullAndUndefined).join("_");
    }

    static from(id: string, status: AsyncTaskStatus, error?: PayloadError): AsyncTask
    {
        return {id, status, error};
    }
}
