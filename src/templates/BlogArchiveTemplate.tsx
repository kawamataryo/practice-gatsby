import React from "react";
import { Link } from "gatsby";
import { FacebookFeedData } from "../../types/graphql-types";
import { extractTitle } from "../utils/extractTitle";
import { Grid } from "@material-ui/core";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { BlogCard } from "../components/blogCard";

type BlogArchiveTemplateProps = {
  pageContext: {
    feeds: FacebookFeedData[];
    currentPageNumber: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
};

export const blogArchiveTemplate: React.FC<BlogArchiveTemplateProps> = ({
  pageContext: { feeds, hasNextPage, hasPrevPage, currentPageNumber }
}) => {
  const feedLists = feeds.map(feed => {
    return (
      <Grid item xs={12} sm={4} key={feed.id!}>
        <h1>
          <BlogCard
            id={feed.id!}
            title={extractTitle(feed.message!)}
            content={feed.message!}
            image={feed.full_picture!}
            createdAt={feed.created_time!}
          />
        </h1>
      </Grid>
    );
  });

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <Grid container spacing={3}>
          {feedLists}
        </Grid>
        {hasNextPage && (
          <Link to={"/blog/" + (currentPageNumber + 1)}>次へ</Link>
        )}
        {hasPrevPage && (
          <Link to={"/blog/" + (currentPageNumber - 1)}>前へ</Link>
        )}
      </div>
    </Layout>
  );
};

export default blogArchiveTemplate;
