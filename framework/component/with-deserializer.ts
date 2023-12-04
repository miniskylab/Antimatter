import {ComponentProps} from "@miniskylab/antimatter-framework";
import {ComponentType, createElement, JSX} from "react";

export function withDeserializer<TSerializedProps, TProps extends ComponentProps<TProps["style"]>>(
    component: ComponentType<TProps>,
    deserialize: (serializedProps: TSerializedProps) => TProps
): ComponentType<TSerializedProps>
{
    return function _(serializedProps: TSerializedProps): JSX.Element
    {
        return createElement(component, deserialize(serializedProps));
    };
}
