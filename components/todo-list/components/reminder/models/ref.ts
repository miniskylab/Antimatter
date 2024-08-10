export type Ref = {
    readonly flashHighlight?: () => void;
    readonly expandHeight?: (onAnimationEnd?: () => void) => void;
    readonly contractHeight?: (onAnimationEnd?: () => void) => void;
    readonly collapseHeight?: (onAnimationEnd: () => void) => void;
};
