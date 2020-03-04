const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postList = await graphql(`
    {
      allWordpressPost(sort: { fields: date, order: DESC }, limit: 1000) {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (postList.errors) {
    console.error(postList.errors)
    throw new Error(postList.errors)
  }

  postList.data.allWordpressPost.nodes.forEach(node => {
    const { slug, id } = node
    createPage({
      path: id,
      component: path.resolve(`./src/templates/page.tsx`),
      context: {
        id
      }
    })
  })
}
