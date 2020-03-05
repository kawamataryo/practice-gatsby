import path from 'path'
import { GatsbyNode } from 'gatsby'
import { Wordpress__PostConnection } from '../types/graphql-types'

type PostList = {
  allWordpressPost: Wordpress__PostConnection
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql<PostList>(`
    {
      allWordpressPost(sort: { fields: date, order: DESC }, limit: 1000) {
        nodes {
          id
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    throw new Error(result.errors)
  }

  // 投稿一覧ページの作成
  const POST_PER_PAGE = 3
  const posts = result.data.allWordpressPost.nodes
  const numPages = Math.ceil(posts.length / POST_PER_PAGE)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/posts` : `/posts/${i + 1}`,
      component: path.resolve(`./src/templates/post-list-template.tsx`),
      context: {
        limit: POST_PER_PAGE,
        skip: i * POST_PER_PAGE,
        numPages,
        currentPage: i + 1
      }
    })
  })
}
