import {Button} from "@miniskylab/antimatter-button";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import React from "react";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className = "header",
    headline,
    onPrevClick,
    onNextClick,
    onHeadlineClick
}: Props): JSX.Element
{
    return (
        <div className={className}>
            <Button
                className={`${className}__navigator`}
                icon={{name: Icomoon.ChevronLeft}}
                disabled={!onPrevClick}
                onClick={onPrevClick}
            />
            <Button
                className={`${className}__headline`}
                label={{text: headline}}
                disabled={!onHeadlineClick}
                onClick={onHeadlineClick}
            />
            <Button
                className={`${className}__navigator`}
                icon={{name: Icomoon.ChevronRight}}
                disabled={!onNextClick}
                onClick={onNextClick}
            />
        </div>
    );
}
