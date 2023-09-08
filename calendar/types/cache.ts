import {DateView, MonthView, YearView} from "../components";

export type Cache = {
    readonly dateViewData: Map<string, DateView.DateInfo[][]>;
    readonly monthViewData: Map<string, MonthView.MonthInfo[]>;
    readonly yearViewData: Map<string, YearView.YearInfo[]>;
};
