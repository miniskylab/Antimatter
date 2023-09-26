import {Action, ActionCreator} from "@reduxjs/toolkit";
import {put, PutEffect} from "redux-saga/effects";
import {isEnvironment, PlatformEnvironment} from "./environment";
import {HttpStatusCode} from "./http-status-code";
import {Authentication} from "./security";

type ApiCallFn = (...parameters: unknown[]) => Promise<unknown>;
export async function secureApiCall<TContext, TApiCallFn extends ApiCallFn>(
    ctxAndApiCallFn: [TContext, TApiCallFn],
    ...parameters: Parameters<TApiCallFn>
): Promise<ReturnType<TApiCallFn>>
{
    const [context, apiCallFn] = ctxAndApiCallFn;
    if (isEnvironment(PlatformEnvironment.Web))
    {
        return await apiCallFn.bind(context)(...parameters);
    }

    while (true)
    {
        try
        {
            const {accessToken} = await Authentication.retrieveTokenAsync();
            parameters.push({headers: {Authorization: `Bearer ${accessToken}`}});

            return await apiCallFn.bind(context)(...parameters);
        }
        catch (error)
        {
            if (error?.response?.status === HttpStatusCode.Unauthorized)
            {
                await Authentication.refreshTokenAsync();
                continue;
            }

            throw error;
        }
    }
}

export function putError<TActionCreator extends ActionCreator<Action>, TError extends Error>(
    actionCreator: TActionCreator,
    error: TError
): PutEffect<Action>
{
    const serializableError = JSON.parse(JSON.stringify(error));
    return put(actionCreator(serializableError));
}
