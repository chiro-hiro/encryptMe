const path = require('path');

module.exports = {
    mode: 'production',
    watch: true,
    entry: {
        main: path.resolve(__dirname, 'src/main.js'),
        encryptme: path.resolve(__dirname, 'src/encryptme.js'),
        popup: path.resolve(__dirname, 'src/popup.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    }
};