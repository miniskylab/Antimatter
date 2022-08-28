import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {TopbarProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Topbar({
    className,
    functionalityIcons = [],
    notificationIcons = []
}: TopbarProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <div className={`${bem(className, "Logo")} ${Icomoon.Flag}`}/>
            <div className={bem(className, "NotificationArea")}>
                {notificationIcons.map((icon, index) => <div key={index} className={bem(className, "Icon")}>{icon}</div>)}
            </div>
            {functionalityIcons.map((icon, index) => <div key={index} className={bem(className, "Icon")}>{icon}</div>)}
        </div>
    );
}
