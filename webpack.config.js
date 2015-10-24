var path = require('path');

module.exports = {
    entry: "./app/app.js",
    output: {
        path: "app",
        filename: "bundle.js"
    },
    node: {
      fs: "empty"
    },
    resolve: {
      root: path.resolve(__dirname, '..'),
      modulesDirectories: ["node_modules", "bower_components"]
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
