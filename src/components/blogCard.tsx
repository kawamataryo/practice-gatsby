import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

type PropsType = {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
};

const useStyles = makeStyles({
  title: {
    fontSize: "16px",
    color: "#000"
  }
});

export const BlogCard: React.FC<PropsType> = ({
  id,
  title,
  content,
  createdAt,
  image
}) => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          fields {
            feedId
          }
          publicURL
        }
      }
    }
  `);
  const targetFileNodes = data.allFile.nodes.filter(
    node => node.fields?.feedId === id
  );
  const src = targetFileNodes[0]?.publicURL;

  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image={src ? src : "aaa"}
          title="Contemplative Reptile"
          style={{ height: 300 }}
        />
        <CardContent>
          <Link to={`blog/${id}`}>
            <h1 className={classes.title}>{title}</h1>
          </Link>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
