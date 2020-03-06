require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext"
  }
});

const { createPosts } = require("./gatsby-node/create-posts");

exports.createPages = async ({ actions, graphql }) => {
  await createPosts({ actions, graphql });
};
