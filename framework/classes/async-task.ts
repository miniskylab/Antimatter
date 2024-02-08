import {AsyncTaskStatus} from "../enums";
import {isNotNullAndUndefined} from "../functions";
import {AsyncError} from "./async-error";

export class AsyncTask
{
    readonly id: string;
    status: AsyncTaskStatus;
    error?: AsyncError;

    private constructor() { /* Do nothing! */ }

    static deriveIdFrom(...anyStrings: (string | undefined)[]): string
    {
        return anyStrings.filter(isNotNullAndUndefined).join("_");
    }

    static from(id: string, status: AsyncTaskStatus, error?: AsyncError): AsyncTask
    {
        return {id, status, error};
    }
}
