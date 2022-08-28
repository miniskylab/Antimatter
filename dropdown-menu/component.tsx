import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React, {createRef, RefObject} from "react";
import {DropdownMenuProps, State} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class DropdownMenu extends React.Component<DropdownMenuProps, State>
{
    static defaultProps: Partial<DropdownMenuProps> = {
        keyValueSet: {},
        selectedKeys: [],
        placeholder: String.EMPTY,
        maxSelectionCount: 1,
        isOpenByDefault: false
    };

    private readonly menuRef: RefObject<HTMLUListElement>;

    constructor(props: DropdownMenuProps)
    {
        super(props);

        this.menuRef = createRef<HTMLUListElement>();
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
        return (
            <div
                className={bem(this.props.className, null, this.state.isOpen ? "Open" : "Closed")}
                onClick={(): void => { this.setState({isOpen: !this.state.isOpen}); }}
                onBlur={(): void => { this.setState({isOpen: false}); }}
                tabIndex={0}
            >
                {this.renderContainer()}
                {this.renderMenu()}
                <div className={bem(this.props.className, "Caret")}/>
            </div>
        );
    }

    private renderContainer(): JSX.Element
    {
        const hasSelection = this.props.selectedKeys.length > 0;
        return (
            <div className={bem(this.props.className, hasSelection ? "BadgeContainer" : "Placeholder")}>
                {
                    hasSelection
                        ? this.props.selectedKeys.map((x, i) => (
                            <Label key={i} className={bem("DropdownMenu-Badge")} text={this.props.keyValueSet[x]}/>
                        ))
                        : this.props.placeholder
                }
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
                menuItems.push(<div key={key} className={bem(this.props.className, "Divider")}/>);
                continue;
            }

            let menuItemModifier = String.EMPTY;
            const menuItemIsSelected = this.props.selectedKeys.includes(key);
            const menuItemIsDisabled = !menuItemIsSelected && this.canMultiSelect && this.maxSelectionCountReached;
            if (menuItemIsSelected)
            {
                menuItemModifier = "Selected";
            }
            else if (menuItemIsDisabled)
            {
                menuItemModifier = "Disabled";
            }

            menuItems.push(
                <li
                    key={key}
                    className={bem(this.props.className, "MenuItem", menuItemModifier)}
                    onClick={menuItemIsDisabled ? undefined : event => { this.onMenuItemClick(event, key); }}
                >
                    {value}
                    {menuItemIsSelected && (
                        <Icon
                            className={bem("DropdownMenu-SelectionIcon")}
                            name={Icomoon.CheckMark}
                        />
                    )}
                </li>
            );
        }

        return (
            <ul
                ref={this.menuRef}
                className={bem(this.props.className, "Menu", !this.state.isOpen && "Hidden")}
                onClick={event => { event.stopPropagation(); }}
                onWheel={event => { this.onMenuWheel(event); }}
            >
                {menuItems}
            </ul>
        );
    }

    private onMenuWheel(event: React.WheelEvent): void
    {
        if (event.deltaY === 0)
        {
            return;
        }

        const menuElement = this.menuRef.current;
        if (menuElement)
        {
            menuElement.scrollTo({
                left: menuElement.scrollLeft + event.deltaY,
                behavior: "smooth"
            });
        }
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
