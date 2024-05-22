import {type CompositeTransitionSettings} from "@miniskylab/antimatter-transition";
import type {View} from "../types";

export type CalendarState = {
    readonly today: Date;
    readonly view: View;
    readonly transitionSettings: CompositeTransitionSettings;
}
