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
        <div className={bem(className)}>
            <div className={bem(className, "CoverPhoto")}>
                <picture>
                    <source media={`(min-width:${ScreenSize.Large}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:${ScreenSize.Medium}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:${ScreenSize.Small}px)`} srcSet={coverPhoto.url.original}/>
                    <source media={`(min-width:0)`} srcSet={coverPhoto.url.original}/>
                    <img src={coverPhoto.url.original} alt={coverPhoto.altText}/>
                </picture>
            </div>
            <div className={bem(className, "Banner")}>
                <div className={bem(className, "PersonalInfo")}>
                    <Label className={bem("SelfIntroductionHero-PersonalInfoTitle")} text={emailTitle}/>
                    <Label className={bem("SelfIntroductionHero-PersonalInfoValue")} text={emailAddress}/>
                </div>
                <div className={bem(className, "Avatar")}>
                    <picture>
                        <source media={`(min-width:${ScreenSize.Large}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:${ScreenSize.Medium}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:${ScreenSize.Small}px)`} srcSet={avatar.url.original}/>
                        <source media={`(min-width:0)`} srcSet={avatar.url.original}/>
                        <img src={avatar.url.original} alt={avatar.altText}/>
                    </picture>
                </div>
                <div className={bem(className, "PersonalInfo")}>
                    <Label className={bem("SelfIntroductionHero-PersonalInfoTitle")} text={locationTitle}/>
                    <Label className={bem("SelfIntroductionHero-PersonalInfoValue")} text={location}/>
                </div>
            </div>
            <Label className={bem("SelfIntroductionHero-Name")} text={name}/>
            <Label className={bem("SelfIntroductionHero-AlternativeName")} text={alternativeName}/>
            <Label className={bem("SelfIntroductionHero-Description")} text={description}/>
            {downloadButton && (
                <DownloadButton
                    className={bem("SelfIntroductionHero-DownloadButton")}
                    {...downloadButton}
                />
            )}
            <div className={bem(className, "MobileSection")}>
                <HighlightedParagraph
                    className={bem("SelfIntroductionHero-MobilePersonalInfo")}
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
