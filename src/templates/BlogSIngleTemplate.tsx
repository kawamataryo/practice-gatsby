import React from "react";
import { FacebookFeedData } from "../../types/graphql-types";
import { extractTitle } from "../utils/extractTitle";

type BlogSingleTemplateProps = {
  pageContext: {
    feed: FacebookFeedData;
  };
};

export const blogSIngleTemplate: React.FC<BlogSingleTemplateProps> = ({
  pageContext: { feed }
}) => {
  return (
    <div>
      <h1>{extractTitle(feed.message!)}</h1>
      <time>{feed.created_time}</time>
      <pre>{feed.message!}</pre>
      {feed.full_picture && <img src={feed.full_picture} alt="" />}
    </div>
  );
};

export default blogSIngleTemplate;
