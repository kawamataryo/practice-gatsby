require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: "gatsby-starter-typescript-plus",
    description: "A starter kit for TypeScript-based Gatsby projects with sensible defaults.",
    keywords: "gatsbyjs, gatsby, javascript, sample, something",
    siteUrl: "https://gatsby-starter-typescript-plus.netlify.com",
    author: {
      name: "Resi Respati",
      url: "https://twitter.com/resir014",
      email: "resir014@gmail.com"
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: process.env.WORDPRESS_URL_PATH,
        protocol: process.env.WORDPRESS_URL_PROTOCOL,
        hostingWPCOM: false,
        useACF: false,
        includedRoutes: ["**/posts", "**/media"],
        plugins: [
          {
            resolve: `gatsby-wordpress-inline-images`,
            options: {
              baseUrl: process.env.WORDPRESS_URL_PATH,
              protocol: process.env.WORDPRESS_URL_PROTOCOL,
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: `types/graphql-types.d.ts`
      }
    },
    "gatsby-plugin-extract-schema",
    "gatsby-plugin-emotion",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-image"
  ]
};
