import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React, {createRef, RefObject} from "react";
import {Direction, DropdownMenuProps, State, Status} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class DropdownMenu extends React.Component<DropdownMenuProps, State>
{
    static defaultProps: Partial<DropdownMenuProps> = {
        menuItems: {},
        placeholder: String.EMPTY,
        isOpenByDefault: false
    };

    private readonly menuRef: RefObject<HTMLUListElement>;
    private readonly dropdownRef: RefObject<HTMLDivElement>;

    constructor(props: DropdownMenuProps)
    {
        super(props);

        this.menuRef = createRef<HTMLUListElement>();
        this.dropdownRef = createRef<HTMLDivElement>();
        this.state = {
            isOpen: false,
            dropDirection: Direction.Down
        };
    }

    componentDidMount(): void
    {
        if (this.props.isOpenByDefault)
        {
            this.toggleMenu();
        }
    }

    render(): JSX.Element
    {
        return (
            <div
                ref={this.dropdownRef}
                className={bem(this.props.className, null, this.state.isOpen ? "Open" : "Closed")}
                onClick={() => { this.toggleMenu(); }}
                onBlur={() => { this.hideMenu(); }}
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
        const selectedValues = Object.keys(this.props.menuItems).filter(x => this.props.menuItems[x].status === Status.Selected);
        const hasSelection = selectedValues.length > 0;
        return (
            <div className={bem(this.props.className, hasSelection ? "BadgeContainer" : "Placeholder")}>
                {
                    hasSelection
                        ? selectedValues.map((selectedValue, index) => (
                            <Label
                                key={index}
                                className={bem("DropdownMenu-Badge")}
                                text={this.props.menuItems[selectedValue].displayText ?? selectedValue}
                            />
                        ))
                        : this.props.placeholder
                }
            </div>
        );
    }

    private renderMenu(): JSX.Element
    {
        return (
            <ul
                ref={this.menuRef}
                className={bem(
                    this.props.className,
                    "Menu",
                    !this.state.isOpen
                        ? "Hidden"
                        : this.state.dropDirection === Direction.Up
                            ? "DropUp"
                            : String.EMPTY
                )}
                onClick={event => { event.stopPropagation(); }}
                onWheel={event => { this.onMenuWheel(event); }}
            >
                {this.renderMenuItems()}
            </ul>
        );
    }

    private renderMenuItems(): JSX.Element[]
    {
        const menuItemJsxElements: JSX.Element[] = [];
        for (const menuItemValue in this.props.menuItems)
        {
            const menuItem = this.props.menuItems[menuItemValue];
            if (menuItem.status === Status.Divider)
            {
                menuItemJsxElements.push(<div key={menuItemValue} className={bem(this.props.className, "Divider")}/>);
                continue;
            }

            menuItemJsxElements.push(
                <li
                    key={menuItemValue}
                    className={bem(
                        this.props.className,
                        "MenuItem",
                        menuItem.status === Status.Selected
                            ? "Selected"
                            : menuItem.status === Status.Disabled
                                ? "Disabled"
                                : String.EMPTY
                    )}
                    onClick={
                        menuItem.status === undefined || menuItem.status === Status.Selected
                            ? event =>
                            {
                                event.stopPropagation();
                                this.onMenuItemClick(menuItemValue);
                            }
                            : undefined
                    }
                >
                    {menuItem.displayText || menuItemValue}
                    {menuItem.status === Status.Selected && (
                        <Icon
                            className={bem("DropdownMenu-SelectionIcon")}
                            name={Icomoon.CheckMark}
                        />
                    )}
                </li>
            );
        }

        return menuItemJsxElements;
    }

    private onMenuItemClick(menuItemValue: string): void
    {
        const isSelected = this.props.menuItems[menuItemValue].status === Status.Selected;
        if (!isSelected && this.props.closeMenuAfterFirstSelection)
        {
            this.hideMenu();
        }

        this.props.onClick?.(menuItemValue);
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

    private toggleMenu(): void
    {
        if (this.state.isOpen)
        {
            this.hideMenu();
        }
        else
        {
            let containerRect = {top: 0, height: window.innerHeight};
            if (this.props.containerClassName)
            {
                let container = this.dropdownRef.current.parentElement;
                while (container && !container.className.includes(this.props.containerClassName))
                {
                    container = container.parentElement;
                }

                if (container)
                {
                    containerRect = container.getBoundingClientRect();
                }
            }

            const pxBufferSpace = 10;
            const dropdownRect = this.dropdownRef.current.getBoundingClientRect();
            const dropdownRelativePosition = {
                top: dropdownRect.top - containerRect.top,
                bottom: dropdownRect.bottom - containerRect.top
            };

            let dropDirection = Direction.Down;
            const menuHeight = this.getMenuHeight();
            if (menuHeight)
            {
                const enoughSpaceToDropDown = dropdownRelativePosition.bottom + menuHeight + pxBufferSpace < containerRect.height;
                const enoughSpaceToDropUp = dropdownRelativePosition.top > menuHeight + pxBufferSpace;
                dropDirection = !enoughSpaceToDropDown && enoughSpaceToDropUp
                    ? Direction.Up
                    : Direction.Down;
            }

            this.setState({
                isOpen: true,
                dropDirection
            });
        }
    }

    private hideMenu(): void
    {
        this.setState({isOpen: false});
    }

    private getMenuHeight(): number
    {
        const menuStyles = getComputedStyle(this.menuRef.current);
        const height = Number.parseInt(menuStyles.height);
        if (!height)
        {
            return 0;
        }

        return Number.parseInt(menuStyles.height) +
               Number.parseInt(menuStyles.paddingTop) +
               Number.parseInt(menuStyles.paddingBottom) +
               Number.parseInt(menuStyles.borderTopWidth) +
               Number.parseInt(menuStyles.borderBottomWidth) +
               Number.parseInt(menuStyles.marginTop) +
               Number.parseInt(menuStyles.marginBottom);
    }
}
