import {ComponentType, createElement} from "react";
import {ComponentProps} from "../component";

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
