const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    env: {
        API: 'http://localhost:5001'
    }
}