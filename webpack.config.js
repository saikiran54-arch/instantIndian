const path = require('path')

module.exports = {
    mode : 'development',
    entry : ['./assets/index.js','./assets/firebase.js'],
    output : {
        path : path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    watch: true
}