import {DownloadButtonStyle} from "@miniskylab/antimatter-download-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {HighlightedParagraphStyle} from "@miniskylab/antimatter-highlighted-paragraph";
import {ImageStyle} from "@miniskylab/antimatter-image";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {SelfIntroductionHeroProps} from "./props";

export type SelfIntroductionHeroStyle = (selfIntroductionHeroProps: WithoutStyle<SelfIntroductionHeroProps>) => {
    Root?: ViewStyle;
    CoverPhoto?: ImageStyle;
    Banner?: ViewStyle;
    AvatarContainer?: ViewStyle;
    Avatar?: ImageStyle;
    Name?: LabelStyle;
    AlternativeName?: LabelStyle;
    Description?: LabelStyle;
    PersonalInfo?: HighlightedParagraphStyle;
    DownloadButton?: DownloadButtonStyle;
};
