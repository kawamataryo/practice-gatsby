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

  const fluid = targetFileNodes[0]?.childImageSharp?.fluid;
  if (!fluid) {
    return <p>no image</p>;
  }

  return <Img fluid={fluid} style={{ maxWidth: fluid.presentationWidth }} />;
};

export default externalImage;
