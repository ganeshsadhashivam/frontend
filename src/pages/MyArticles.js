import React from "react";
import { useGetAllUserPostsQuery } from "../services/appAPI";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import ArticlePreview from "../components/ArticlePreview";
const MyArticles = () => {
  const { data: userArticles, isLoading, isError } = useGetAllUserPostsQuery();
  console.log(userArticles, isLoading, isError);
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
  console.log(userArticles.length === 0);
  if (userArticles.length === 0) {
    return (
      <div>
        <h1 className="text-center">You Don't have Articles Yet</h1>
      </div>
    );
  }

  return (
    <Container>
      <h1 className="text-center">My Articles</h1>
      <Row>
        <Col md={9} className="d-flex justify-content-center flex-wrap gap-4">
          {userArticles.map((articles, index) => (
            <ArticlePreview key={index} article={articles} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MyArticles;
