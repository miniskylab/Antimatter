import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {TopbarProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Topbar({
    className
}: TopbarProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <Icon className={bem("Topbar-Logo")} name={Icomoon.Flag}/>
            <div className={bem(className, "Container")}>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
            </div>
            <div className={bem(className, "Container", "Right")}>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Download}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.User}/>
            </div>
        </div>
    );
}
