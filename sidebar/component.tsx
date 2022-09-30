import {Button} from "@miniskylab/antimatter-button";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {SidebarProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Sidebar({
    className,
    selectedUrl = window.location.href,
    categories,
    onNavigate
}: SidebarProps): JSX.Element
{
    selectedUrl = normalize(selectedUrl);
    return (
        <div className={bem(className)}>
            {categories.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                    <Label className={bem("Sidebar-Category")} text={category.label}/>
                    {category.menuItems.map((menuItem, menuItemIndex) =>
                    {
                        const menuItemUrl = normalize(menuItem.url);
                        const isSelectedUrl = menuItemUrl === selectedUrl;

                        return (
                            <Button
                                key={menuItemIndex}
                                className={bem("Sidebar-Link", null, isSelectedUrl && "Selected")}
                                icon={menuItem.icon}
                                label={menuItem.label}
                                href={!isSelectedUrl ? menuItem.url : undefined}
                                onClick={!isSelectedUrl ? event => { onNavigate?.(event, menuItem.url); } : undefined}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );

    function normalize(inputUrl: string): string
    {
        const outputURL = new URL(inputUrl, window.location.origin);
        outputURL.searchParams.forEach(x => { outputURL.searchParams.delete(x); });
        outputURL.hash = String.EMPTY;

        return outputURL.href;
    }
}
