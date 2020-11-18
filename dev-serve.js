const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js');

let entry = config.entry;
Object.keys(entry).forEach((name) => {
    entry[name].unshift('webpack-dev-server/client?http://localhost:8088/');
});

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: "localhost",
});

server.listen(8088);