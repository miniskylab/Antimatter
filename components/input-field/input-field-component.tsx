import React, {Component} from "react";
import {InputFieldComponentProps} from "./models/input-field-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class InputFieldComponent extends Component<InputFieldComponentProps>
{
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
