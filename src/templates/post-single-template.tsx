import * as React from 'react'

import { graphql } from 'gatsby'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import { Wordpress__Post } from '../../types/graphql-types'

export const query = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      date(formatString: "YYYY/MM/DD")
      content
      title
    }
  }
`

type DataType = {
  data: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    wordpressPost: Wordpress__Post
  }
}

const PageTemplate: React.FC<DataType> = ({ data }) => {
  const post = data.wordpressPost
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>{post.title}</h1>
          <span>{post.date}</span>
          <div dangerouslySetInnerHTML={{ __html: post.content! }} />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default PageTemplate
