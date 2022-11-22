const path = require("path");
const Webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    applyAntimatterConfiguration(webpackConfiguration, mode)
    {
        webpackConfiguration.resolve = {
            ...webpackConfiguration.resolve,
            extensions: [
                ".web.js",
                ".web.jsx",
                ...webpackConfiguration.resolve.extensions
            ],
            alias: {
                "react-native$": "react-native-web",
                ...webpackConfiguration.resolve.alias
            }
        };

        webpackConfiguration.plugins.push(
            new Webpack.DefinePlugin({
                __DEV__: mode.toLowerCase() !== "production",
                "process.env.NODE_ENV": JSON.stringify(mode.toLowerCase())
            }),
            new ESLintPlugin({
                extensions: ["ts", "tsx"],
                emitWarning: mode.toLowerCase() !== "production"
            })
        );

        webpackConfiguration.module.rules.push(
            {
                test: /\.jsx?$/,
                include: webIncompatibleReactNativeModules,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["module:metro-react-native-babel-preset", {
                                    useTransformReactJSXExperimental: true
                                }],
                                ["@babel/preset-react"]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]"
                }
            }
        );

        return webpackConfiguration;
    }
};

function webIncompatibleReactNativeModules(pathToModule)
{
    if (pathToModule)
    {
        const webIncompatibleReactNativeModules = [
            "@expo"
        ];

        for (const webIncompatibleReactNativeModule of webIncompatibleReactNativeModules)
        {
            const webIncompatibleReactNativeModulePath = path.normalize(path.join("node_modules", webIncompatibleReactNativeModule));
            if (pathToModule.includes(webIncompatibleReactNativeModulePath))
            {
                return true;
            }
        }
    }

    return false;
}
