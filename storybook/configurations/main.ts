import {applyRepositoryWideModifications} from "@miniskylab/webpack";
import {type StorybookConfig} from "@storybook/react-webpack5";
import findWorkspaceRoot from "find-yarn-workspace-root";
import path from "path";
import {Configuration} from "webpack";

const workspaceRoot = findWorkspaceRoot()!;
const pathToTypeScriptConfigFile = path.join(workspaceRoot, "tsconfig.json");
export default {
    core: {
        disableTelemetry: true
    },
    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    },
    staticDirs: ["../static-assets"],
    stories: [
        "../../**/stories/index.mdx",
        "../../**/stories/stories.tsx"
    ],
    addons: [
        "@storybook/addon-docs",
        "@storybook/addon-measure",
        "@storybook/addon-controls",
        "@storybook/addon-a11y",
        "@storybook/addon-actions",
        "@storybook/addon-links"
    ],
    typescript: {
        check: true,
        checkOptions: {
            typescript: {
                configFile: pathToTypeScriptConfigFile,
                context: path.join(workspaceRoot, "Frontend/MiniSkyLab.Antimatter")
            }
        },
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldRemoveUndefinedFromOptional: true,
            shouldExtractLiteralValuesFromEnum: true,
            tsconfigPath: pathToTypeScriptConfigFile,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
        }
    },
    async webpackFinal(storybookDefault, {configType: mode})
    {
        applyRepositoryWideModifications(storybookDefault as Configuration, mode);
        return storybookDefault;
    }
} satisfies StorybookConfig;
