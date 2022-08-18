import React from "react";
import {ImageMatrixProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function ImageMatrix({
    className,
    images = []
}: ImageMatrixProps): JSX.Element
{
    return (
        <div className={className}>
            {images.map((x, i) => (
                <img
                    key={i}
                    className={`${className}__image`}
                    src={x.url.original}
                    alt={x.altText}
                />
            ))}
        </div>
    );
}
