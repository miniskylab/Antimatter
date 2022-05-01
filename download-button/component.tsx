import {Icon} from "@miniskylab/antimatter-icon";
import React from "react";
import {Props, State} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
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
        const disabled = this.props.disabled || this.state.disabled;

        return (
            <a
                href={this.state.disabled ? undefined : this.state.href}
                className={this.props.variant[`button${disabled ? "--disabled" : String.EMPTY}`]}
                download={this.props.fileName || true}
                target={"_self"}
            >
                {this.props.icon && <Icon className={this.props.variant["button__icon"]} iconName={this.props.icon}/>}
                {this.props.text && <div className={this.props.variant["button__text"]}>{this.props.text}</div>}
            </a>
        );
    }
}
