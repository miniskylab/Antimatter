import {Button, Target} from "@miniskylab/antimatter-button";
import React from "react";
import {Props, State} from "./model";
import * as Variant from "./variant";

/**
 * This component inherits all functionalities and styles from the `Button` component.
 */
export class Component extends React.Component<Props, State>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        fileName: String.EMPTY,
        href: String.EMPTY,
        text: String.EMPTY,
        disabled: false
    };

    constructor(props: Props)
    {
        super(props);

        this.state = {
            disabled: true,
            href: props.href
        };
    }

    async componentDidMount(): Promise<void>
    {
        if (this.state.disabled)
        {
            const response = await fetch(this.props.href);
            const blobURL = URL.createObjectURL(await response.blob());

            this.setState({
                disabled: false,
                href: blobURL
            });
        }
    }

    render(): JSX.Element
    {
        return (
            <Button
                variant={this.props.variant}
                href={this.state.disabled ? undefined : this.state.href}
                text={this.props.text}
                icon={this.props.icon}
                target={Target.SameFrame}
                download={this.props.fileName || true}
                disabled={this.props.disabled || this.state.disabled}
                onClick={undefined}
            />
        );
    }
}
