import {Button} from "@miniskylab/antimatter-button";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {Image} from "@miniskylab/antimatter-model";
import React from "react";
import {CardProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    image,
    title,
    description,
    ctaButtons = []
}: CardProps): JSX.Element
{
    return (
        <div className={className}>
            {Image.isAssignableFrom(image) && <img className={`${className}__image`} src={image.url.original} alt={image.altText}/>}
            {typeof image === "string" && <Icon className={`${className}__image`} name={image}/>}
            <Label className={`${className}__title`} text={title}/>
            <Label className={`${className}__description`} text={description}/>
            {ctaButtons && ctaButtons.length > 0 && (
                <div className={`${className}__cta-button-container`}>
                    {ctaButtons.map((buttonProps, i) => (
                        <Button
                            key={i}
                            className={`${className}__cta-button`}
                            onClick={undefined}
                            {...buttonProps}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
