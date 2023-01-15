import React from "react";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import BlogImg from "../images/blog.webp";
import { useDeletePostsMutation } from "../services/appAPI";
const ArticlePreview = ({ article, currentUserPost }) => {
  const { title, content, image, _id } = article;
  console.log(title, content, image, _id);

  const [deleteArticle, { isLoading }] = useDeletePostsMutation();
  // handle delete function
  const handleDelete = () => {
    deleteArticle(_id);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={image || BlogImg}
        style={{ maxHeight: 200, objectFit: "cover" }}
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
        <ButtonGroup>
          <LinkContainer to={`/articles/${_id}`}>
            <Button variant="info">view</Button>
          </LinkContainer>
          {currentUserPost && (
            <>
              <LinkContainer to={`/articles/${_id}/edit`}>
                <Button variant="outline-primary">Edit</Button>
              </LinkContainer>
              <Button variant="outline-danger" onClick={handleDelete}>
                {isLoading ? "Deleting" : "Delete"}
              </Button>
            </>
          )}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default ArticlePreview;
