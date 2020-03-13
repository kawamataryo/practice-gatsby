import React from "react";
import { Link } from "gatsby";
import { FacebookFeedData } from "../../types/graphql-types";
import { extractTitle } from "../utils/extractTitle";

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
      <div key={feed.id!}>
        <h1>
          <Link to={"/blog/" + feed.id!}>{extractTitle(feed.message!)}</Link>
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
