import {EnhancedStore} from "@reduxjs/toolkit";
import React, {ComponentType, createElement, JSX} from "react";
import {Provider} from "react-redux";

export function withProvider(component: ComponentType, clientStore: EnhancedStore, preloadedState?: Record<string, unknown>): ComponentType
{
    return function _(props): JSX.Element
    {
        return (
            <Provider store={clientStore} serverState={preloadedState}>
                {createElement(component, props)}
            </Provider>
        );
    };
}
