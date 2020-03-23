"use strict";
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// sourceNodesにて外部画像のファイルノードを作成する
exports.sourceNodes = async ({
  actions,
  createNodeId,
  cache,
  store,
  getNode
}) => {
  const urls = getNode("527570683956974").feed.data.map(d => d.full_picture);

  // ここでは外部画像のURLの配列を処理するサンプルを示す
  await Promise.all(
    urls
      .filter(u => u != null)
      .map(async sampleImageUrl => {
        // createRemoteFileNodeで外部の画像のファイルノードを作成する
        const fileNode = await createRemoteFileNode({
          url: sampleImageUrl,
          cache,
          store,
          createNode: actions.createNode,
          createNodeId: createNodeId
        });

        // 他ファイルノードと区別するための識別子を付与
        await actions.createNodeField({
          node: fileNode,
          name: "SampleImage",
          value: "true"
        });

        // メタ情報として画像のURLを付与
        await actions.createNodeField({
          node: fileNode,
          name: "link",
          value: sampleImageUrl
        });

        return fileNode;
      })
  );
  console.log("hgoe");

  /* (中略) */
};

require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext"
  }
});

exports.createPages = async ({ actions, graphql }) => {
  await require("./gatsby/create-blog.ts").createBlog({ actions, graphql });
};
