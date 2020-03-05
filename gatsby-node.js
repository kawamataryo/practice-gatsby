require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext'
  }
})

exports.createPages = require('./gatsby-node/post-single').createPages
