import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import Webpack from "webpack";

export function applyAntimatterConfiguration(webpackConfiguration: Webpack.Configuration, mode: string)
{
    const isProductionMode = mode.toLowerCase() === "production";

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
            __DEV__: !isProductionMode,
            "process.env.NODE_ENV": JSON.stringify(mode.toLowerCase())
        }),
        new ESLintPlugin({
            extensions: ["ts", "tsx"],
            emitWarning: !isProductionMode
        }),
        new MiniCssExtractPlugin({filename: isProductionMode ? "[name].[contenthash].css" : "[name].css"})
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
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
        },
        {
            test: /\.(ttf|eot|woff|woff2|svg)$/,
            type: "asset/resource",
            generator: {
                filename: "fonts/[name][ext]"
            }
        }
    );

    if (isProductionMode)
    {
        webpackConfiguration.optimization = {
            ...(webpackConfiguration.optimization || {}),
            minimizer: [
                ...(webpackConfiguration.optimization.minimizer || []),
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            "default",
                            {
                                discardComments: {removeAll: true}
                            }
                        ]
                    },
                    minify: CssMinimizerPlugin.cleanCssMinify
                })
            ]
        };
    }

    return webpackConfiguration;
}

function webIncompatibleReactNativeModules(pathToModule: string)
{
    if (pathToModule)
    {
        const webIncompatibleReactNativeModules = [
            "@expo",
            "@react-native/assets"
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
