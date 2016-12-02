var path = require('path');
var webpack = require('webpack');

module.exports = [
    {
        name: "Server",
        entry: "./server/src/server.ts",
        output: {
            filename: "./server/server.js"
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",
        
        target: "node",
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },
        module: {
            loaders: [
                { test: /\.tsx?$/, loaders: ["ts-loader"], exclude: [/node_modules/, /\.spec.tsx?$/] },
                { test: /\.json$/, loader: 'json-loader' }
            ],

            preLoaders: [
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { test: /\.js$/, loader: "source-map-loader" }
            ]
        },
    },

    {
        name: "Client",
        entry: "./client/src/index.tsx",
        output: {
            filename: "bundle.js",
            path: __dirname + "/client/dist"
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },

        module: {
            loaders: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                { test: /\.tsx?$/, loader: "ts-loader" }
            ],

            preLoaders: [
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { test: /\.js$/, loader: "source-map-loader" }
            ]
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
    },

    {
        name: "Client webpack-dev-server",
        entry: [
            "webpack-dev-server/client?http://localhost:8080",
            "webpack/hot/only-dev-server",
            "./client/src/index.tsx"
        ],
        output: {
            filename: "bundle.js",
            publicPath: "/dist/",
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },

        module: {
            loaders: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                { test: /\.tsx?$/, loaders: ["ts-loader"], exclude: [/node_modules/, /\.spec.tsx?$/] }
            ],

            preLoaders: [
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { test: /\.js$/, loader: "babel-loader", exclude: [/node_modules/] }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        devServer: {
            hot: true,
            inline: true,
            proxy: {
                "/users": {
                    "target": 'http://localhost:8080',
                    ignorePath: true,
                    changeOrigin: false,
                    secure: false
                }
            }
        }
    }
];