import {bem} from "@miniskylab/antimatter-model";
import React, {Fragment} from "react";
import {SidebarProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Sidebar({
    className,
    icons = []
}: SidebarProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <div className={bem(className, "Background")}/>
            {icons.map((icon, i) => <Fragment key={i}>{icon}</Fragment>)}
        </div>
    );
}