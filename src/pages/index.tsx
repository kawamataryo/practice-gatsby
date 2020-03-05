import * as React from "react";
import { Link, graphql } from "gatsby";

import Page from "../components/Page";
import Container from "../components/Container";
import IndexLayout from "../layouts";
import { Wordpress__PostConnection } from "../../types/graphql-types";

export const query = graphql`
  query allPost {
    allWordpressPost(limit: 4, sort: { order: DESC, fields: date }) {
      edges {
        node {
          slug
          id
          title
          content
        }
      }
    }
  }
`;

type DataType = {
  data: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    allWordpressPost: Wordpress__PostConnection;
  };
};

const IndexPage: React.FC<DataType> = ({ data }) => {
  const postsElement = data.allWordpressPost.edges.map(edge => {
    const { node } = edge;
    return (
      <div key={node.id}>
        <h1>
          <Link to={`/${decodeURI(node.slug!)}`}>{node.title}</Link>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: node.content! }} />
      </div>
    );
  });

  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          {postsElement}
        </Container>
      </Page>
    </IndexLayout>
  );
};

export default IndexPage;
