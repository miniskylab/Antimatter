import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
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
                {this.props.icon && <Icon {...this.props.icon} variant={this.props.icon.variant ?? this.props.variant}/>}
                {this.props.label?.text && <Label {...this.props.label} variant={this.props.label.variant ?? this.props.variant}/>}
            </a>
        );
    }
}
