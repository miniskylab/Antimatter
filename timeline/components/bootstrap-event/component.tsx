import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {BootstrapEventProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    icon,
    name,
    description
}: BootstrapEventProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <div className={bem(className, "TriangleArrow")}/>
            <Icon
                className={bem("Timeline-BootstrapEvent-Icon")}
                name={icon}
            />
            <Label
                className={bem("Timeline-BootstrapEvent-Name")}
                text={name}
            />
            <Label
                className={bem("Timeline-BootstrapEvent-Description")}
                text={description}
            />
        </div>
    );
}
