import {DownloadButton} from "@miniskylab/antimatter-download-button";
import {HighlightedParagraph} from "@miniskylab/antimatter-highlighted-paragraph";
import {Image} from "@miniskylab/antimatter-image";
import {Label} from "@miniskylab/antimatter-label";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {PersonalInfoContext, SelfIntroductionHeroContext, SelfIntroductionHeroProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function SelfIntroductionHero({
    style = Variant.Default,
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
    const props: Required<SelfIntroductionHeroProps> = {
        style, coverPhoto, avatar, name, alternativeName, emailTitle, emailAddress, locationTitle, location, description, downloadButton
    };

    const context = useMemo<SelfIntroductionHeroContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <SelfIntroductionHeroContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Image style={computedStyle.CoverPhoto} source={coverPhoto}/>
                <View style={computedStyle.Banner}>
                    <View style={computedStyle.AvatarContainer}>
                        <Image style={computedStyle.Avatar} source={avatar}/>
                    </View>
                </View>
                <Label style={computedStyle.Name}>{name}</Label>
                <Label style={computedStyle.AlternativeName}>{alternativeName}</Label>
                <Label style={computedStyle.Description}>{description}</Label>
                <PersonalInfoContext.Provider value={"location"}>
                    <HighlightedParagraph style={computedStyle.PersonalInfo} title={locationTitle} content={location}/>
                </PersonalInfoContext.Provider>
                <PersonalInfoContext.Provider value={"email"}>
                    <HighlightedParagraph style={computedStyle.PersonalInfo} title={emailTitle} content={emailAddress}/>
                </PersonalInfoContext.Provider>
                {downloadButton && <DownloadButton style={computedStyle.DownloadButton} {...downloadButton}/>}
            </View>
        </SelfIntroductionHeroContext.Provider>
    );
}
