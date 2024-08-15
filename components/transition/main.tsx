import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {View, type ViewStyle} from "@miniskylab/antimatter-view";
import React, {JSX, useState} from "react";
import {Transitionable} from "./components";
import {Stage} from "./enums";
import {TransitionAnimationHook, TransitionContextHook} from "./hooks";
import {TransitionContext, TransitionProps, type TransitionState} from "./models";

/**
 * A component for seamlessly transitioning other components from one state to another over time. It is most commonly used to animate the
 * mounting and unmounting of a component.
 */
export function Transition({
    style,
    settings,
    children
}: TransitionProps): JSX.Element | null
{
    const props: AllPropertiesMustPresent<TransitionProps> = {
        style, settings, children
    };

    const [state, setState] = useState<TransitionState>({
        children: {}
    });

    const context = useComponentContext<TransitionContext>({props, state});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props, state);

    const transitionableStyle: Transitionable.Style = function (transitionableProps: Transitionable.Props): ViewStyle
    {
        const transitionContext = TransitionContextHook.useTransitionContext();

        const isActiveTransitionable = transitionableProps.id === transitionContext.props.children?.key;
        const transitionStage = isActiveTransitionable ? Stage.Enter : Stage.Exit;

        return () => ({
            position: "absolute",
            width: "100%",
            height: "100%",
            ...TransitionAnimationHook.useAnimation(transitionStage, onTransitionFinished)
        });

        function onTransitionFinished()
        {
            if (!isActiveTransitionable)
            {
                transitionableProps?.onReadyToUnmount(transitionableProps.id);
            }
        }
    };

    if (!Object.values(state.children).some(x => x === children))
    {
        setState(prevState =>
        {
            Ts.Error.throwIfNullOrUndefined(children?.key);
            return {
                ...prevState,
                children: {
                    ...prevState.children,
                    [children.key]: children
                }
            };
        });

        return null;
    }

    return (
        <TransitionContext.Provider value={context}>
            <View style={computedStyle}>
                {Object.values(state.children).map(child => (
                    <Transitionable.Component
                        key={child.key}
                        id={`${child.key}`}
                        style={transitionableStyle}
                        onReadyToUnmount={onTransitionableIsReadyToUnmount}
                    >
                        {child}
                    </Transitionable.Component>
                ))}
            </View>
        </TransitionContext.Provider>
    );

    function onTransitionableIsReadyToUnmount(transitionableId: string): void
    {
        setState(prevState => ({
            ...prevState,
            children: Object.fromEntries(
                Object.entries(prevState.children).filter(x => x[0] !== transitionableId)
            )
        }));
    }
}
