import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {DataTableRowProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    cells = [],
    onClick
}: DataTableRowProps): JSX.Element
{
    return (
        <div
            className={bem(className, null, onClick && "Interactable")}
            onClick={onClick}
        >
            {cells.map((cellData, index) => (<Label key={index} className={bem("DataTable-Row-Cell")} text={cellData}/>))}
        </div>
    );
}
