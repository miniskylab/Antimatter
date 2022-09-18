import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {CheckboxProps, Status} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Checkbox({
    className,
    status,
    onChange
}: CheckboxProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <div className={bem(className, "Box", status === Status.Checked && "Active")} onClick={() => { onChange?.(getNewStatus()); }}>
                {status === Status.Checked && <Icon className={bem("Checkbox-CheckMark")} name={Icomoon.CheckMark}/>}
            </div>
        </div>
    );

    function getNewStatus(): Status
    {
        switch (status)
        {
            case Status.Checked:
                return Status.Unchecked;

            default:
                return Status.Checked;
        }
    }
}
