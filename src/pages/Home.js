import React from "react";
import { Col, Row, Container } from "react-bootstrap";

import { useGetAllPostsQuery } from "../services/appAPI";
import { Spinner } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import MainArticle from "../components/MainArticle";
import ArticlePreview from "../components/ArticlePreview";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
const Home = () => {
  const { data: articles, isLoading, isError } = useGetAllPostsQuery();
  console.log(articles);
  const sidebarArticles = articles?.slice(0, 4) || [];

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
      <div className="banner">
        <h1 className="banner-title text-center mt-4">Blog's</h1>
      </div>
      <Row>
        <MainArticle article={articles[articles.length - 1]} />
        <Col md={9} className="blog-main d-flex pb-4 flex-wrap gap-4">
          {articles.map((article, index) => (
            <ArticlePreview article={article} key={index} />
          ))}
        </Col>
        <Col md={3} className="blog-sidebar py-4">
          <ListGroup variant="flush">
            <h2>Latest Articles</h2>

            {sidebarArticles.map((article, index) => (
              <LinkContainer to={`/articles/${article._id}`} key={index}>
                <ListGroup.Item>{article.title}</ListGroup.Item>
              </LinkContainer>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
