const path = require('path');

module.exports = [
    {
        entry: './js/new_game/index.js',
        output: {
            libraryTarget: "umd",
            filename: 'new_game.js',
            path: path.resolve(__dirname, 'js/bundle')
        }, 
        target: 'web'
    }, {
        entry: './js/settings/index.js',
        output: {
            libraryTarget: "umd",
            filename: 'settings.js',
            path: path.resolve(__dirname, 'js/bundle')
        }, 
        target: 'web'
    }
];