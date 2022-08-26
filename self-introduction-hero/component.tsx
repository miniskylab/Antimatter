import {DownloadButton} from "@miniskylab/antimatter-download-button";
import {HighlightedParagraph} from "@miniskylab/antimatter-highlighted-paragraph";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
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
            <div className={`${className}__CoverPhoto`}>
                <picture>
                    <source media={`(min-width:${ScreenSize.Large}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:${ScreenSize.Medium}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:${ScreenSize.Small}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:0)`} srcSet={coverPhoto.url.original}/>
                    <img src={coverPhoto.url.original} alt={coverPhoto.altText}/>
                </picture>
            </div>
            <div className={`${className}__Banner`}>
                <div className={`${className}__PersonalInfo`}>
                    <Label className={"SelfIntroductionHero-PersonalInfoTitle"} text={emailTitle}/>
                    <Label className={"SelfIntroductionHero-PersonalInfoValue"} text={emailAddress}/>
                </div>
                <div className={`${className}__Avatar`}>
                    <picture>
                        <source media={`(min-width:${ScreenSize.Large}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:${ScreenSize.Medium}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:${ScreenSize.Small}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:0)`} srcSet={avatar.url.original}/>
                        <img src={avatar.url.original} alt={avatar.altText}/>
                    </picture>
                </div>
                <div className={`${className}__PersonalInfo`}>
                    <Label className={"SelfIntroductionHero-PersonalInfoTitle"} text={locationTitle}/>
                    <Label className={"SelfIntroductionHero-PersonalInfoValue"} text={location}/>
                </div>
            </div>
            <Label className={"SelfIntroductionHero-Name"} text={name}/>
            <Label className={"SelfIntroductionHero-AlternativeName"} text={alternativeName}/>
            <Label className={"SelfIntroductionHero-Description"} text={description}/>
            {downloadButton && (
                <DownloadButton
                    className={"SelfIntroductionHero-DownloadButton"}
                    {...downloadButton}
                />
            )}
            <div className={`${className}__MobileSection`}>
                <HighlightedParagraph
                    className={"SelfIntroductionHero-MobilePersonalInfo"}
                    title={locationTitle}
                    content={location}
                />
                <br/>
                <HighlightedParagraph
                    className={bem("SelfIntroductionHero-MobilePersonalInfo", null, "Primary")}
                    title={emailTitle}
                    content={emailAddress}
                />
            </div>
        </div>
    );
}
