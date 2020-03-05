import path from 'path'
import { GatsbyNode } from 'gatsby'
import { Wordpress__PostConnection } from '../types/graphql-types'

type PostList = {
  allWordpressPost: Wordpress__PostConnection
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postList = await graphql<PostList>(`
    {
      allWordpressPost(sort: { fields: date, order: DESC }, limit: 1000) {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (postList.errors || !postList.data) {
    throw new Error(postList.errors)
  }

  postList.data.allWordpressPost.nodes.forEach(node => {
    const { slug, id } = node
    createPage({
      path: decodeURI(slug!),
      component: path.resolve(`./src/templates/page.tsx`),
      context: {
        id
      }
    })
  })
}
