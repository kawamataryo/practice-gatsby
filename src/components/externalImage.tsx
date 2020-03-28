import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";

const externalImage: React.FC<{ imageId: string }> = ({ imageId }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          fields {
            feedId
          }
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  console.log(JSON.stringify(data.allFile.nodes));
  const targetFileNode = data.allFile.nodes.filter(
    node => node.fields?.feedId === imageId
  );

  return <Img fluid={targetFileNode.childImageSharp?.fluid} />;
};

export default externalImage;
