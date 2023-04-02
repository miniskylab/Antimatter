import {DateView, MonthView, YearView} from "../component";

export type Cache = {
    readonly dateViewData: Map<string, DateView.DateInfo[][]>;
    readonly monthViewData: Map<string, MonthView.MonthInfo[]>;
    readonly yearViewData: Map<string, YearView.YearInfo[]>;
};
