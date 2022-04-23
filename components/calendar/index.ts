export {Name} from "./name";
export {Props, ComponentVariant} from "./model";
export {Component as Calendar} from "./component";
export * as Variant from "./variant";

import * as SubComponent from "./components";

export const HeaderVariant = SubComponent.Header.Variant;
export const DateViewVariant = SubComponent.DateView.Variant;
export const MonthViewVariant = SubComponent.MonthView.Variant;
export const YearViewVariant = SubComponent.YearView.Variant;
export const ControlVariant = SubComponent.Control.Variant;
