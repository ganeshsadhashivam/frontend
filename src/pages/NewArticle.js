import React, { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useCreatePostMutation } from "../services/appAPI";
import Blog from "../images/blog.jpg";
import "./NewArticle.css";
import { useNavigate } from "react-router-dom";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadingImage, setUpLoadingImage] = useState(false);
  //appAPI
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  //React UseState()

  //converting to html to save in to db

  const handlePublish = (e) => {
    console.log("in hp");
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);
    if (!title || !image || !content) {
      return alert("Title,Content and Image is Required");
    }
    //create article
    createPost({ title, content, image: url }).then(({ error }) => {
      console.log("in creating post");
      console.log(error);
      if (!error) {
        alert("Post Created Succesfully");
      } else {
        console.log(error);
      }
    });

    // console.log("raw content", rawContentState);
    // console.log("content", content);
  };

  //handle Editor Change

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  //For Uploading Image
  const uploadImage = (e) => {
    console.log("in uploadImage");
    e.preventDefault();
    if (!image) return;
    setUrl("");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ntggi6j0");
    setUpLoadingImage(true);
    fetch("https://api.cloudinary.com/v1_1/dafqu2slg/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json(res))
      .then((data) => {
        console.log(data);
        setUpLoadingImage(false);
        setUrl(data.url);
      })
      .catch((error) => {
        setUpLoadingImage(false);
        console.log(error);
      });
  };

  //Image Validation
  const handleImageValidation = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      setImage(null);
      return alert("File is too big , Please Choose Images 1MB or Less");
    } else {
      setImage(file);
    }
  };

  if (isLoading) {
    console.log("is loading");
    return (
      <div className="py-4">
        <h1 className="text-center">Creating your Article...</h1>
      </div>
    );
  }

  if (isSuccess) {
    console.log("is success");
    setTimeout(() => {
      navigate("/");
    }, 1500);
    return (
      <div>
        <h1 className="text-center">Succesfully your Article is Created </h1>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handlePublish}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Editor
              stripPastedStyles={true}
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper mb-4"
              editorClassName="editor"
              toolbarClassName="toolbar"
            />
            <Form.Select>
              <option>Select Category</option>
              <option value="Javascript">javascript</option>
              <option value="React">React</option>
              <option value="Node">Node</option>
              <option value="Express">Express</option>
              <option value="others">Others</option>
            </Form.Select>
            <div>
              {!url && (
                <p className="alert alert-info">
                  Please Upload an Image before Publishing your Article
                </p>
              )}
            </div>
            <div className="my-4">
              <input
                type="file"
                onChange={handleImageValidation}
                accept="image/png, image/jpeg"
              />
              <Button onClick={uploadImage} disabled={uploadingImage || !image}>
                upload
              </Button>
            </div>
            <Button
              variant="primary"
              type="submit"
              disabled={uploadingImage || !url}
            >
              Create Article
            </Button>
          </Form>
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center"
        >
          {uploadingImage && (
            <div className="text-center">
              <Spinner animation="border" role="status" />
              <br />
              <p className="py-2">Uploading Image</p>
            </div>
          )}
          <div className="defaultblogimg">
            {!url && !uploadingImage && <img src={Blog} />}

            {url && <img src={url} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewArticle;
