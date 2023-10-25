import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {NavbarProps} from "../../models";

export const TestData = {
    getTabs(): NavbarProps["tabs"]
    {
        const queryParamaterName = "tab";
        const tabs = [
            [TabName.Lorem, DefaultIconSet.Home],
            [TabName.Suscipit, DefaultIconSet.Calendar],
            [TabName.Pellentesque, DefaultIconSet.Money],
            [TabName.Vestibulum, DefaultIconSet.Statistics],
            [TabName.Consectetur, DefaultIconSet.Gear]
        ].map((tabData: [TabName, DefaultIconSet]) =>
        {
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

        const windowLocationUrl = new URL(window.top.location.href);
        windowLocationUrl.searchParams.delete(queryParamaterName);
        window.top.history.replaceState(null, "", decodeURIComponent(windowLocationUrl.href));

        return tabs;
    }
};

enum TabName
{
    Lorem = "Lorem",
    Suscipit = "Suscipit",
    Pellentesque = "Pellentesque",
    Vestibulum = "Vestibulum",
    Consectetur = "Consectetur"
}
