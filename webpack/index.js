import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import path from "path";
import Webpack from "webpack";

export function applyAntimatterConfiguration(webpackConfiguration, mode)
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
            test: /\.(ttf)$/,
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

function webIncompatibleReactNativeModules(pathToModule)
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
