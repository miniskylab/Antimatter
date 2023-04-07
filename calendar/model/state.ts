import {CompositeTransitionSettings} from "@miniskylab/antimatter-transition";
import {View} from "../type";

export type CalendarState = {
    readonly today: Date;
    readonly view: View;
    readonly transitionSettings: CompositeTransitionSettings;
}
