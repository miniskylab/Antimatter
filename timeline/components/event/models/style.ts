import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ImageStyle} from "@miniskylab/antimatter-image";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (eventProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Icon: IconStyle;
    TriangleArrow: ViewStyle;
    Name: LabelStyle;
    Hr: ViewStyle;
    Image: ImageStyle;
    Row: ViewStyle;
    BulletinIcon: IconStyle;
    StartDate: LabelStyle;
    ArrowRightIcon: IconStyle;
    EndDate: LabelStyle;
    Duration: LabelStyle;
    Location: LabelStyle;
    Description: LabelStyle;
};
