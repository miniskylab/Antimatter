import {Ts} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {NavbarProps} from "../../models";

export const TestData = {
    getTabs(): NavbarProps["tabs"]
    {
        const queryParamaterName = "selectedTab";
        const tabs = [
            [TabName.Lorem, DefaultIconSet.Home],
            [TabName.Ipsum, DefaultIconSet.Calendar],
            [TabName.Dolor, DefaultIconSet.Registry],
            [TabName.Suscipit, DefaultIconSet.Music],
            [TabName.Libero, DefaultIconSet.Gear]
        ].map((tabData: [TabName, DefaultIconSet]) =>
        {
            Ts.Error.throwIfNullOrUndefined(window.top);

            const [tabName, tabIcon] = tabData;
            const windowLocationUrl = new URL(window.top.location.href);
            const selectedTabName = windowLocationUrl.searchParams.get(queryParamaterName) || TabName.Lorem;

            windowLocationUrl.searchParams.set(queryParamaterName, tabName);
            return {
                label: tabName,
                icon: tabIcon,
                disabled: selectedTabName === tabName,
                destination: decodeURIComponent(windowLocationUrl.href)
            };
        });

        if (window.top)
        {
            const windowLocationUrl = new URL(window.top.location.href);
            windowLocationUrl.searchParams.delete(queryParamaterName);
            window.top.history.replaceState(null, "", decodeURIComponent(windowLocationUrl.href));
        }

        return tabs;
    }
};

enum TabName
{
    Lorem = "Lorem",
    Ipsum = "Ipsum",
    Dolor = "Dolor",
    Suscipit = "Suscipit",
    Libero = "Libero"
}
