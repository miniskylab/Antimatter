import {NoneTransitionSettings} from "./none-transition-settings";
import {SlideTransitionSettings} from "./slide-transition-settings";
import {ZoomTransitionSettings} from "./zoom-transition-settings";

export type CompositeTransitionSettings = NoneTransitionSettings | SlideTransitionSettings | ZoomTransitionSettings;
