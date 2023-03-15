module.exports = {
    presets: [
        [
            "@babel/presets-env",
            {targets: {
                node: "current",
                modules: false,
            }},
        ]
    ],
    plugins: [],
};
