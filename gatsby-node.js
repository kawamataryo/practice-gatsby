"use strict";
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext"
  }
});

exports.createPages = async ({ actions, graphql }) => {
  await require("./gatsby/createdPosts.ts").createdPosts({ actions, graphql });
};
