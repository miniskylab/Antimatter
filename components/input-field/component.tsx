import React, {Component} from "react";
import {Props} from "./models/props";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class InputField extends Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        autoFocus: false,
        value: String.EMPTY,
        placeholderText: String.EMPTY,
        isPasswordField: false
    };

    render(): JSX.Element
    {
        return (
            <input
                type={this.props.isPasswordField ? "password" : "text"}
                className={this.props.variant["input-field"]}
                value={this.props.value}
                placeholder={this.props.placeholderText}
                onChange={this.onChange.bind(this)}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                onPointerDown={this.props.onPointerDown}
                onKeyDown={this.props.onKeyDown}
                autoFocus={this.props.autoFocus}
            />
        );
    }

    private onChange(changeEvent: React.ChangeEvent<HTMLInputElement>): void
    {
        const newValue = changeEvent.target.value;
        this.props.onChange?.(newValue);
    }
}
