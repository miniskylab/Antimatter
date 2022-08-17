import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {DownloadButtonProps, State} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class DownloadButton extends React.Component<DownloadButtonProps, State>
{
    static defaultProps: Partial<DownloadButtonProps> = {
        className: "antimatter-download-button-default",
        fileName: String.EMPTY,
        href: String.EMPTY,
        disabled: false
    };

    constructor(props: DownloadButtonProps)
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
        const disabled = this.props.disabled || this.state.disabled;

        return (
            <a
                href={this.state.disabled ? undefined : this.state.href}
                className={`${this.props.className}${disabled ? "--disabled" : String.EMPTY}`}
                download={this.props.fileName || true}
                target={"_self"}
                draggable={false}
            >
                {this.props.icon && <Icon className={`${this.props.className}__icon`} name={this.props.icon}/>}
                {this.props.label && <Label className={`${this.props.className}__label`} text={this.props.label}/>}
            </a>
        );
    }
}
