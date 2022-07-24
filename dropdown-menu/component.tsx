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
        selectedKeys: [],
        placeholderText: String.EMPTY,
        maxSelectionCount: 1,
        isOpenByDefault: false
    };

    constructor(props: Props)
    {
        super(props);

        this.state = {
            isOpen: this.props.isOpenByDefault
        };
    }

    private get canMultiSelect()
    {
        return this.props.maxSelectionCount > 1;
    }

    private get maxSelectionCountReached()
    {
        return this.props.selectedKeys.length >= this.props.maxSelectionCount;
    }

    render(): JSX.Element
    {
        const hasSelection = this.props.selectedKeys.length > 0;
        return (
            <div
                className={this.props.variant[`dropdown-menu${this.state.isOpen ? "--open" : "--closed"}`]}
                onClick={(): void => { this.setState({isOpen: !this.state.isOpen}); }}
                onBlur={(): void => { this.setState({isOpen: false}); }}
                tabIndex={0}
            >
                {
                    <div className={this.props.variant[`dropdown-menu__${hasSelection ? "badge-container" : "placeholder-text"}`]}>
                        {
                            hasSelection
                                ? this.props.selectedKeys.map((x, i) => (
                                    <div key={i} className={this.props.variant["dropdown-menu__badge"]}>{this.props.keyValueSet[x]}</div>
                                ))
                                : this.props.placeholderText
                        }
                    </div>
                }
                <div className={this.props.variant["dropdown-menu__caret"]}/>
                {this.state.isOpen && this.renderMenu()}
            </div>
        );
    }

    private renderMenu(): JSX.Element
    {
        const menuItems: JSX.Element[] = [];
        for (const key in this.props.keyValueSet)
        {
            if (!this.props.keyValueSet.hasOwnProperty(key))
            {
                continue;
            }

            const value = this.props.keyValueSet[key];
            if (value === "---")
            {
                menuItems.push(<div key={key} className={this.props.variant["dropdown-menu__divider"]}/>);
                continue;
            }

            let menuItemModifier = String.EMPTY;
            const menuItemIsSelected = this.props.selectedKeys.includes(key);
            const menuItemIsDisabled = !menuItemIsSelected && this.canMultiSelect && this.maxSelectionCountReached;
            if (menuItemIsSelected)
            {
                menuItemModifier = "--selected";
            }
            else if (menuItemIsDisabled)
            {
                menuItemModifier = "--disabled";
            }

            menuItems.push(
                <li
                    key={key}
                    className={this.props.variant[`dropdown-menu__menu-item${menuItemModifier}`]}
                    onClick={menuItemIsDisabled ? undefined : event => { this.onMenuItemClick(event, key); }}
                >
                    {value}
                    {menuItemIsSelected && (
                        <Icon
                            className={this.props.variant["dropdown-menu__selection-icon"]}
                            iconName={IconName.CheckMark}
                        />
                    )}
                </li>
            );
        }

        return (
            <ul className={this.props.variant["dropdown-menu__menu"]} onClick={event => { event.stopPropagation(); }}>
                {menuItems}
            </ul>
        );
    }

    private onMenuItemClick(event: React.MouseEvent<HTMLElement, MouseEvent>, key: string): void
    {
        event.stopPropagation();

        const menuItemIsSelected = this.props.selectedKeys.includes(key);
        if (menuItemIsSelected)
        {
            this.props.onChange?.(this.props.selectedKeys.filter(x => x !== key));

            const maxSelectionCountReachedAfterThisClick = (this.props.selectedKeys.length - 1) >= this.props.maxSelectionCount;
            if (maxSelectionCountReachedAfterThisClick)
            {
                this.setState({isOpen: false});
            }
        }
        else
        {
            if (this.maxSelectionCountReached)
            {
                if (!this.canMultiSelect)
                {
                    this.props.onChange?.([key]);
                }
            }
            else
            {
                this.props.onChange?.([...this.props.selectedKeys, key]);
            }

            const maxSelectionCountReachedAfterThisClick = (this.props.selectedKeys.length + 1) >= this.props.maxSelectionCount;
            if (maxSelectionCountReachedAfterThisClick)
            {
                this.setState({isOpen: false});
            }
        }
    }
}
