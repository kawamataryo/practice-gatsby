"use strict";
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// TODO: TS化する
// childImageSharpがnullになったら`yarn clean`すると直る
exports.createBlogImages = async ({
  actions: { createNode, createNodeField, reporter },
  createNodeId,
  cache,
  store,
  getNode
}) => {
  // クエリは投げられないでNodeから直接取得
  const feedData = getNode("527570683956974").feed.data.filter(
    u => u.full_picture != null
  );

  await Promise.all(
    feedData.map(async data => {
      const fileNode = await createRemoteFileNode({
        url: data.full_picture,
        cache,
        store,
        createNode,
        createNodeId
      });

      await createNodeField({
        node: fileNode,
        name: "feedImage",
        value: "true"
      });

      await createNodeField({
        node: fileNode,
        name: "feedId",
        value: data.id
      });

      return fileNode;
    })
  );
};
