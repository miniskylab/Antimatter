import {ComponentType, createElement} from "react";

export function addVariants<TProps>(
    component: ComponentType<TProps>,
    getVariants: (props: TProps) => TProps
): ComponentType<TProps>
{
    return function _(props: TProps): JSX.Element
    {
        return createElement(
            component,
            {
                ...props,
                ...getVariants(props)
            }
        );
    };
}
