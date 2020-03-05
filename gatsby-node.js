require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext'
  }
})

exports.createPostSinglePages = require('./gatsby-node/post-single').createPages
exports.createPostListPages = require('./gatsby-node/post-list').createPages
