import {EnhancedStore} from "@reduxjs/toolkit";
import React, {ComponentType, createElement, JSX} from "react";
import {Provider} from "react-redux";

export function withReduxStore(component: ComponentType, reduxStore: EnhancedStore, preloadedState?: Record<string, unknown>): ComponentType
{
    return function _(props): JSX.Element
    {
        return (
            <Provider store={reduxStore} serverState={preloadedState}>
                {createElement(component, props)}
            </Provider>
        );
    };
}
