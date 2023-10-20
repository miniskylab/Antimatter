import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {NavbarProps} from "../../models";

export const TestData = {
    getTabs(): NavbarProps["tabs"]
    {
        return [
            [TabName.Home, DefaultIconSet.Home],
            [TabName.Planning, DefaultIconSet.Calendar],
            [TabName.Transactions, DefaultIconSet.Money],
            [TabName.Statistics, DefaultIconSet.Statistics],
            [TabName.Settings, DefaultIconSet.Gear]
        ].map((tabData: [TabName, DefaultIconSet]) =>
        {
            const [tabName, tabIcon] = tabData;
            const queryParamaterName = "tab";
            const windowLocationUrl = new URL(window.top.location.href);
            const selectedTabName = windowLocationUrl.searchParams.get(queryParamaterName) || TabName.Home;

            windowLocationUrl.searchParams.set(queryParamaterName, tabName);
            return {destination: windowLocationUrl.href, label: tabName, icon: tabIcon, isHighlighted: selectedTabName === tabName};
        });
    }
};

enum TabName
{
    Home = "Home",
    Planning = "Planning",
    Transactions = "Transactions",
    Statistics = "Statistics",
    Settings = "Settings"
}
