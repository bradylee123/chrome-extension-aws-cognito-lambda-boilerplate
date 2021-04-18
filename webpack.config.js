const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        content: './src/app/content.ts',
        background: './src/app/background.ts',
        popup: './src/ui/popup.tsx',
    },

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },

    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: './dist',
        watchOptions: {
          ignored: /node_modules/
        }
     }
};
