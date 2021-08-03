import React, {Fragment} from "react";
import {RecordComponentProps} from "./models/record-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function RecordComponent(props: RecordComponentProps): JSX.Element
{
    return (
        <div className={props.variant[`record${props.onClick !== undefined ? "--interactable" : String.EMPTY}`]} onClick={props.onClick}>
            {props.cellData.map((cellData, cellIndex): JSX.Element => (<Fragment key={cellIndex}>{cellData}</Fragment>))}
        </div>
    );
}
