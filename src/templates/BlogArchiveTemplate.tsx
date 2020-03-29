import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { FacebookFeedData } from "../../types/graphql-types";
import { extractTitle } from "../utils/extractTitle";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import Layout from "../components/layout";
import SEO from "../components/seo";

type BlogArchiveTemplateProps = {
  pageContext: {
    feeds: FacebookFeedData[];
    currentPageNumber: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
};

type PropsType = {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
};

const BlogCard: React.FC<PropsType> = ({
  id,
  title,
  content,
  createdAt,
  image
}) => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          fields {
            feedId
          }
          publicURL
        }
      }
    }
  `);

  const targetFileNodes = data.allFile.nodes.filter(
    node => node.fields?.feedId === id
  );

  const src = targetFileNodes[0]?.publicURL;
  console.log(src);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image={src ? src : "aaa"}
          title="Contemplative Reptile"
          style={{ height: 300 }}
        />
        <CardContent>
          <Link to={`blog/${id}`}>
            <h1>{title}</h1>
          </Link>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
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
