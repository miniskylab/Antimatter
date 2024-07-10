import {DownloadButtonStyle} from "@miniskylab/antimatter-download-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ImageStyle} from "@miniskylab/antimatter-image";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {SelfIntroductionHeroProps} from "./props";

export type SelfIntroductionHeroStyle = (selfIntroductionHeroProps: WithoutStyle<SelfIntroductionHeroProps>) => {
    Root: ViewStyle;
    CoverPhoto: ImageStyle;
    Banner: ViewStyle;
    AvatarContainer: ViewStyle;
    Avatar: ImageStyle;
    Name: TextStyle;
    AlternativeName: TextStyle;
    Description: TextStyle;
    SimpleInfoSection1: ViewStyle;
    SimpleInfoSection1Container: ViewStyle;
    SimpleInfoSection1Label: TextStyle;
    SimpleInfoSection1Value: TextStyle;
    SimpleInfoSection2: ViewStyle;
    SimpleInfoSection2Container: ViewStyle;
    SimpleInfoSection2Label: TextStyle;
    SimpleInfoSection2Value: TextStyle;
    DownloadButton: DownloadButtonStyle;
};
