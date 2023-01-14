import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import BlogImg from "../images/blog.webp";
const ArticlePreview = (article) => {
  const { title, content, image, _id } = article;
  console.log(title, content, image, _id);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={image || BlogImg}
        style={{ maxHeight: 200, ubjectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <div
            dangerouslySetInnerHTML={{
              __html: content?.substring(0, 50) + "...",
            }}
          />
        </Card.Text>
        <LinkContainer to={`/artcles/${_id}`}>
          <Button variant="info">Read More</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default ArticlePreview;
