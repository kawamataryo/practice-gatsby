import * as React from "react";

import { graphql, Link } from "gatsby";
import Page from "../components/Page";
import Container from "../components/Container";
import IndexLayout from "../layouts";
import { Wordpress__PostConnection } from "../../types/graphql-types";

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allWordpressPost(sort: { fields: date, order: DESC }, limit: $limit, skip: $skip) {
      nodes {
        id
        title
        excerpt
        slug
      }
    }
  }
`;

type DataType = {
  data: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    allWordpressPost: Wordpress__PostConnection;
  };
  pageContext: {
    currentPage: number;
    numPages: number;
  };
};

const postListTemplate: React.FC<DataType> = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPagePath = currentPage - 1 === 1 ? "/posts" : `posts/${currentPage - 1}`;
  const nextPagePath = `posts/${currentPage + 1}`;

  const posts = data.allWordpressPost.nodes.map(post => {
    return (
      <article key={post.id}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.excerpt! }} />
      </article>
    );
  });

  return (
    <IndexLayout>
      <Page>
        <Container>{posts}</Container>
        {!isFirst && (
          <Link to={prevPagePath} rel="prev">
            前のページ
          </Link>
        )}
        {!isLast && (
          <Link to={nextPagePath} rel="prev">
            次のページ
          </Link>
        )}
      </Page>
    </IndexLayout>
  );
};

export default postListTemplate;
