module.exports = function (api)
{
    api.cache(true);
    return {
        plugins: [
            ["@babel/plugin-proposal-decorators", {version: "legacy"}],
            ["@babel/plugin-proposal-class-properties", {loose: true}]
        ],
        presets: [
            "@babel/preset-typescript"
        ]
    };
};
