import {Icon, IconName} from "@miniskylab/antimatter-icon";
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
        keyValueSet: {},
        placeholderText: String.EMPTY,
        canRemoveSelection: false,
        isOpenByDefault: false
    };

    constructor(props: Props)
    {
        super(props);

        this.state = {
            isOpen: this.props.isOpenByDefault
        };
    }

    render(): JSX.Element
    {
        const hasSelectedValue = Object.keys(this.props.keyValueSet).indexOf(this.props.selectedKey) >= 0;
        return (
            <div
                className={this.props.variant[`dropdown-menu${this.state.isOpen ? "--open" : "--closed"}`]}
                onClick={(): void => { this.setState({isOpen: !this.state.isOpen}); }}
                onBlur={(): void => { this.setState({isOpen: false}); }}
                tabIndex={0}
            >
                {
                    <div className={this.props.variant[`dropdown-menu__${hasSelectedValue ? "selected-value-text" : "placeholder-text"}`]}>
                        {hasSelectedValue ? this.props.keyValueSet[this.props.selectedKey] : this.props.placeholderText}
                    </div>
                }
                <div className={this.props.variant["dropdown-menu__caret"]}/>
                {this.state.isOpen && this.renderMenu()}
            </div>
        );
    }

    private renderMenu(): JSX.Element
    {
        const keyValueSet = this.props.canRemoveSelection
            ? {
                [String.EMPTY]: this.props.placeholderText,
                ...this.props.keyValueSet
            }
            : this.props.keyValueSet;

        const menuItems: JSX.Element[] = [];
        for (const key in keyValueSet)
        {
            if (!keyValueSet.hasOwnProperty(key))
            {
                continue;
            }

            const value = keyValueSet[key];
            if (value === "---")
            {
                menuItems.push(<div key={key} className={this.props.variant["dropdown-menu__divider"]}/>);
                continue;
            }

            const isPlaceholderMenuItem = key === String.EMPTY;
            const isSelectedMenuItem = key === this.props.selectedKey && !isPlaceholderMenuItem;
            let menuItemClassName = "dropdown-menu__menu-item";
            if (isPlaceholderMenuItem)
            {
                menuItemClassName += "--placeholder";
            }
            else if (isSelectedMenuItem)
            {
                menuItemClassName += "--selected";
            }

            menuItems.push(
                <li
                    key={key}
                    className={this.props.variant[menuItemClassName]}
                    onClick={isSelectedMenuItem ? undefined : (): void =>
                    {
                        this.setState({isOpen: false});
                        this.props.onChange?.(key === String.EMPTY ? undefined : key);
                    }}
                >
                    {value}
                    {isSelectedMenuItem && (
                        <Icon
                            className={this.props.variant["dropdown-menu__selection-icon"]}
                            iconName={IconName.CheckMark}
                        />
                    )}
                </li>
            );
        }

        return (<ul className={this.props.variant["dropdown-menu__menu"]}>{menuItems}</ul>);
    }
}
