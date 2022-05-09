import {ComponentProps} from "@miniskylab/antimatter-model";
import {ComponentType, createElement} from "react";

export function withDeserializer<TSerializedProps, TProps extends ComponentProps>(
    component: ComponentType<TProps>,
    deserialize: (serializedProps: TSerializedProps) => TProps
): ComponentType<TSerializedProps>
{
    return function _(serializedProps: TSerializedProps): JSX.Element
    {
        return createElement(component, deserialize(serializedProps));
    };
}
