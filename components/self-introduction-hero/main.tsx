import {DownloadButton} from "@miniskylab/antimatter-download-button";
import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Image} from "@miniskylab/antimatter-image";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {SelfIntroductionHeroContext, SelfIntroductionHeroProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function SelfIntroductionHero({
    style = Variant.Default,
    coverPhoto,
    avatar,
    name,
    alternativeName,
    emailLabel,
    emailValue,
    locationLabel,
    locationValue,
    description,
    downloadButton
}: SelfIntroductionHeroProps): JSX.Element
{
    const props: AllPropertiesMustPresent<SelfIntroductionHeroProps> = {
        style, coverPhoto, avatar, name, alternativeName, emailLabel, emailValue, locationLabel, locationValue, description, downloadButton
    };

    const context = useMemo<SelfIntroductionHeroContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <SelfIntroductionHeroContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Image style={computedStyle.CoverPhoto} source={coverPhoto}/>
                <View style={computedStyle.Banner}>
                    <View style={computedStyle.AvatarContainer}>
                        <Image style={computedStyle.Avatar} source={avatar}/>
                    </View>
                </View>
                <Text style={computedStyle.Name}>{name}</Text>
                <Text style={computedStyle.AlternativeName}>{alternativeName}</Text>
                <Text style={computedStyle.Description}>{description}</Text>
                <View style={computedStyle.SimpleInfoSection1}>
                    <Text style={computedStyle.SimpleInfoSection1Label}>{locationLabel}</Text>
                    <Text style={computedStyle.SimpleInfoSection1Value}>{locationValue}</Text>
                </View>
                <View style={computedStyle.SimpleInfoSection2}>
                    <Text style={computedStyle.SimpleInfoSection2Label}>{emailLabel}</Text>
                    <Text style={computedStyle.SimpleInfoSection2Value}>{emailValue}</Text>
                </View>
                {downloadButton && <DownloadButton style={computedStyle.DownloadButton} {...downloadButton}/>}
            </View>
        </SelfIntroductionHeroContext.Provider>
    );
}
