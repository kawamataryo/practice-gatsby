import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

export const query = graphql`
    query allPost {
        allWordpressPost {
            edges {
                node {
                    id
                    title
                    content
                }
            }
        }
    }
`

const IndexPage = ({data}) => {

  const postsElement =  data.allWordpressPost.edges.map((edge) => {
    const node = edge.node
    return (
        <div key={node.id}>
          <h1>{node.title}</h1>
          <div
              dangerouslySetInnerHTML={{ __html: node.content }} />
        </div>
    )})

  return (
      <IndexLayout>
        <Page>
          <Container>
            <h1>Hi people</h1>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build something great.</p>
            <Link to="/page-2/">Go to page 2</Link>
            { postsElement }
          </Container>
        </Page>
      </IndexLayout>
  )
}

export default IndexPage
