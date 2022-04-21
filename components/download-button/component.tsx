import {Button} from "@miniskylab/antimatter-button";
import React, {Component} from "react";
import {Props} from "./models/props";
import {State} from "./models/state";

/**
 * This component inherits all functionalities and styles from the `Button` component.
 */
export class DownloadButton extends Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {
            disabled: this.isDownloadButton,
            href: props.href
        };
    }

    private get isDownloadButton(): boolean
    {
        return !!this.props.download;
    }

    async componentDidMount(): Promise<void>
    {
        if (this.isDownloadButton)
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
                target={this.props.target}
                download={this.props.download || true}
                disabled={this.props.disabled || this.state.disabled}
                onClick={!this.props.disabled && !this.state.disabled && this.props.onClick ? this.props.onClick : undefined}
            />
        );
    }
}
