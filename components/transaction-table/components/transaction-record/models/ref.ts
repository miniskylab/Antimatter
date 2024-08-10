import {EasingFunction} from "react-native";

export type Ref = {
    readonly flashHighlight?: () => void;
    readonly animateHeightTo?: (
        pxTargetHeight: number,
        easingFunction: EasingFunction,
        msAnimationDuration: number,
        msAnimationDelay: number,
        onAnimationEnd: () => void
    ) => void;
};
