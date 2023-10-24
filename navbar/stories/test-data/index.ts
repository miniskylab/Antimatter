import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {NavbarProps} from "../../models";

export const TestData = {
    getTabs(): NavbarProps["tabs"]
    {
        return [
            [TabName.Lorem, DefaultIconSet.Home],
            [TabName.Suscipit, DefaultIconSet.Calendar],
            [TabName.Pellentesque, DefaultIconSet.Money],
            [TabName.Vestibulum, DefaultIconSet.Statistics],
            [TabName.Consectetur, DefaultIconSet.Gear]
        ].map((tabData: [TabName, DefaultIconSet]) =>
        {
            const [tabName, tabIcon] = tabData;
            const queryParamaterName = "tab";
            const windowLocationUrl = new URL(window.top.location.href);
            const selectedTabName = windowLocationUrl.searchParams.get(queryParamaterName) || TabName.Lorem;

            windowLocationUrl.searchParams.set(queryParamaterName, tabName);
            return {destination: windowLocationUrl.href, label: tabName, icon: tabIcon, disabled: selectedTabName === tabName};
        });
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
