import {addons} from "storybook/manager-api";
import {theme} from "./theme";

addons.setConfig({
    theme: theme.dark,
    sidebar: {
        filters: {patterns: entry => !entry.tags?.includes("hidden-from-sidebar")}
    }
});
