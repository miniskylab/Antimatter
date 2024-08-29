export type Ref = {
    readonly flashHighlight?: () => void;
    readonly editModeExpandHeight?: (onAnimationEnd?: () => void) => void;
    readonly alarmModeExpandHeight?: (onAnimationEnd?: () => void) => void;
    readonly contractHeight?: (onAnimationEnd?: () => void) => void;
    readonly collapseHeight?: (onAnimationEnd: () => void) => void;
};
