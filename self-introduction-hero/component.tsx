import {DownloadButton} from "@miniskylab/antimatter-download-button";
import {HighlightedParagraph} from "@miniskylab/antimatter-highlighted-paragraph";
import {Label} from "@miniskylab/antimatter-label";
import {ScreenSize} from "@miniskylab/antimatter-responsive";
import React from "react";
import {SelfIntroductionHeroProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function SelfIntroductionHero({
    className,
    coverPhoto,
    avatar,
    name,
    alternativeName,
    emailTitle,
    emailAddress,
    locationTitle,
    location,
    description,
    downloadButton
}: SelfIntroductionHeroProps): JSX.Element
{
    return (
        <div className={className}>
            <div className={`${className}__cover-photo`}>
                <picture>
                    <source media={`(min-width:${ScreenSize.Large}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:${ScreenSize.Medium}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:${ScreenSize.Small}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:0)`} srcSet={coverPhoto.url.original}/>
                    <img src={coverPhoto.url.original} alt={coverPhoto.altText}/>
                </picture>
            </div>
            <div className={`${className}__banner`}>
                <div className={`${className}__personal-info`}>
                    <Label className={`${className}__personal-info-title`} text={emailTitle}/>
                    <Label className={`${className}__personal-info-value`} text={emailAddress}/>
                </div>
                <div className={`${className}__avatar`}>
                    <picture>
                        <source media={`(min-width:${ScreenSize.Large}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:${ScreenSize.Medium}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:${ScreenSize.Small}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:0)`} srcSet={avatar.url.original}/>
                        <img src={avatar.url.original} alt={avatar.altText}/>
                    </picture>
                </div>
                <div className={`${className}__personal-info`}>
                    <Label className={`${className}__personal-info-title`} text={locationTitle}/>
                    <Label className={`${className}__personal-info-value`} text={location}/>
                </div>
            </div>
            <Label className={`${className}__name`} text={name}/>
            <Label className={`${className}__alternative-name`} text={alternativeName}/>
            <Label className={`${className}__description`} text={description}/>
            {downloadButton && (
                <DownloadButton
                    className={`${className}__download-button`}
                    {...downloadButton}
                />
            )}
            <div className={`${className}__mobile-section`}>
                <HighlightedParagraph
                    className={`${className}__mobile-personal-info`}
                    title={locationTitle}
                    content={location}
                />
                <br/>
                <HighlightedParagraph
                    className={`${className}__mobile-personal-info--primary`}
                    title={emailTitle}
                    content={emailAddress}
                />
            </div>
        </div>
    );
}
