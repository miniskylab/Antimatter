import React from "react";
import {Props} from "./models/props";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function ImageMatrix(props: Props): JSX.Element
{
    const {
        variant = Variant.Default,
        images = []
    } = props;

    return (
        <div className={variant["image-matrix"]}>
            {images.map((x, i) => (
                <img
                    key={i}
                    className={variant["image-matrix__image"]}
                    src={x.url.original}
                    alt={x.altText}
                />
            ))}
        </div>
    );
}
