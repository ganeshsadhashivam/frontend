import React from "react";
import { useGetOnePostQuery } from "../services/appAPI";
import { useParams } from "react-router-dom";
import { Spinner, Container, Row, Col } from "react-bootstrap";

const SingleArticlePage = () => {
  const { id } = useParams();
  const { isLoading, data: article, isError } = useGetOnePostQuery(id);
  console.log(article);
  if (isError) {
    return (
      <div>
        <h1 className="text-center">An Error has occured</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={8} style={{ margin: "0 auto" }}>
          <img
            src={article.image}
            style={{
              width: "100",
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
          <h1>{article.title}</h1>
          <p>By {article.creator.email}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleArticlePage;
