import React from "react";
import {ImageMatrixComponentProps} from "./models/image-matrix-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function ImageMatrixComponent(props: ImageMatrixComponentProps): JSX.Element
{
    return (
        <div className={props.variant["image-matrix"]}>
            {props.images.map((x, i) => (
                <img
                    key={i}
                    className={props.variant["image-matrix__image"]}
                    src={x.url.original}
                    alt={x.altText}
                />
            ))}
        </div>
    );
}
