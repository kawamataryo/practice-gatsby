import React from "react";
import { FacebookFeedData } from "../../types/graphql-types";
import { extractTitle } from "../utils/extractTitle";
import ExternalImage from "../components/externalImage";
import Layout from "../components/layout";

type BlogSingleTemplateProps = {
  pageContext: {
    feed: FacebookFeedData;
  };
};

export const blogSingleTemplate: React.FC<BlogSingleTemplateProps> = ({
  pageContext: { feed }
}) => {
  return (
    <Layout>
      <div>
        <h1>{extractTitle(feed.message!)}</h1>
        <time>{feed.created_time}</time>
        <pre>{feed.message!}</pre>
        <ExternalImage imageId={feed.id!} />
      </div>
    </Layout>
  );
};

export default blogSingleTemplate;
