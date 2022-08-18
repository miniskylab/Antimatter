import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
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
        <div className={className}>
            <div className={`${className}__logo ${Icomoon.Flag}`}/>
            <div className={`${className}__notification-area`}>
                {notificationIcons.map((icon, index) => <div key={index} className={`${className}__icon`}>{icon}</div>)}
            </div>
            {functionalityIcons.map((icon, index) => <div key={index} className={`${className}__icon`}>{icon}</div>)}
        </div>
    );
}
