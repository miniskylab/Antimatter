import {Button} from "@miniskylab/antimatter-button";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {bem, Image} from "@miniskylab/antimatter-model";
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
        <div className={bem(className)}>
            {Image.isAssignableFrom(image) && <img className={bem(className, "Image")} src={image.url.original} alt={image.altText}/>}
            {typeof image === "string" && <Icon className={bem("TopicCards-Card-Icon")} name={image}/>}
            <Label className={bem("TopicCards-Card-Title")} text={title}/>
            <Label className={bem("TopicCards-Card-Description")} text={description}/>
            {ctaButtons && ctaButtons.length > 0 && (
                <div className={bem(className, "CtaButtonContainer")}>
                    {ctaButtons.map((buttonProps, i) => (
                        <Button
                            key={i}
                            {...buttonProps}
                            className={bem("TopicCards-Card-CtaButton")}
                            onClick={undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
