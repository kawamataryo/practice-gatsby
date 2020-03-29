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

  const targetFileNodes = data.allFile.nodes.filter(
    node => node.fields?.feedId === imageId
  );

  if (!targetFileNodes[0] || !targetFileNodes[0].childImageSharp) {
    return <p>no image</p>;
  }

  return <Img fluid={targetFileNodes[0].childImageSharp.fluid} />;
};

export default externalImage;
