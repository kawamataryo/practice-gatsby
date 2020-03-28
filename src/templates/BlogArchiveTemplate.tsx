import React from "react";
import { Link } from "gatsby";
import { FacebookFeedData } from "../../types/graphql-types";
import { extractTitle } from "../utils/extractTitle";
import ExternalImage from "../components/externalImage";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

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
  return (
    <Card>
      <CardActionArea>
        <CardMedia image={image} title="Contemplative Reptile" />
        <CardContent>
          <ExternalImage imageId={id} />
          <h1>{title}</h1>
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
      <div key={feed.id!}>
        <h1>
          <BlogCard
            id={feed.id!}
            title={extractTitle(feed.message!)}
            content={feed.message!}
            image={feed.full_picture!}
            createdAt={feed.created_time!}
          />
        </h1>
      </div>
    );
  });

  return (
    <div>
      <div>{feedLists}</div>
      {hasNextPage && <Link to={"/blog/" + (currentPageNumber + 1)}>次へ</Link>}
      {hasPrevPage && <Link to={"/blog/" + (currentPageNumber - 1)}>前へ</Link>}
    </div>
  );
};

export default blogArchiveTemplate;
