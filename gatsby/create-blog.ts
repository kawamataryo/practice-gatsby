import { GatsbyNode } from "gatsby";
import path from "path";
import { FacebookConnection } from "../types/graphql-types";
import { arrayChunk } from "../src/utils/arrayChunk";
const blogSingleTemplate = path.resolve(
  "./src/templates/BlogSingleTemplate.tsx"
);
const blogArchiveTemplate = path.resolve(
  "./src/templates/BlogArchiveTemplate.tsx"
);

export const createBlog: GatsbyNode["createPages"] = async ({
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
            created_time(formatString: "YYYY年MM月DD日")
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

  // create single
  feeds!.forEach(feed => {
    createPage({
      path: `/blog/${feed!.id}`,
      component: blogSingleTemplate,
      context: {
        feed
      }
    });
  });

  // create archive
  const PER_PAGE = 40;
  const chunkFeeds = arrayChunk(feeds!, PER_PAGE);

  chunkFeeds.forEach((feeds, index) => {
    createPage({
      path: `/blog/${index + 1}`,
      component: blogArchiveTemplate,
      context: {
        currentPageNumber: index + 1,
        hasPrevPage: index !== 0,
        hasNextPage: index !== chunkFeeds.length - 1,
        feeds
      }
    });
  });
};
