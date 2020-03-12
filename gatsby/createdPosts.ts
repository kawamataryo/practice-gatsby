import { GatsbyNode } from "gatsby";
import path from "path";
import { FacebookConnection } from "../types/graphql-types";
const blogTemplate = path.resolve("./src/templates/blog.tsx");

export const createdPosts: GatsbyNode["createPages"] = async ({
  actions: { createPage },
  graphql
}) => {
  const GET_ALL_FEED = `
  query {
    allFacebook {
      nodes {
        feed {
          data {
            message
            id
            full_picture
            created_time
          }
        }
      }
    }
  }`;

  const feedData = await graphql<{ allFacebook: FacebookConnection }>(
    GET_ALL_FEED
  );

  if (feedData.errors) {
    console.error(feedData.errors);
    return;
  }
  if (!feedData.data) {
    console.error(feedData.data);
    return;
  }

  const feeds = feedData.data.allFacebook.nodes[0].feed!.data;

  feeds!.forEach(feed => {
    createPage({
      path: `/blog/${feed!.id}`,
      component: blogTemplate,
      context: {
        feed
      }
    });
  });
};
