import {AsyncTaskStatus} from "../enums";

export class AsyncTask<TData = unknown>
{
    readonly id: string;
    readonly name: string;
    status: AsyncTaskStatus;
    data?: TData;

    private constructor() { /* Do nothing! */ }

    static from<TData = unknown>(id: string, name: string, status: AsyncTaskStatus, data?: TData): AsyncTask<TData>
    {
        return {
            id: [id, name].join("_"),
            name,
            status,
            data
        };
    }
}
