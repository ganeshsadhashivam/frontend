import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import NewArticle from "./pages/NewArticle";
import EditArticle from "./pages/EditArticle";
import MyArticles from "./pages/MyArticles";
import SingleArticlePage from "./pages/SingleArticlePage";
import NotFound from "./pages/NotFound";
function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        {user && (
          <>
            <Route path="/new-article" element={<NewArticle />} />
            <Route path="/articles/:id/edit" element={<EditArticle />} />
            <Route path="/articles/me" element={<MyArticles />} />
          </>
        )}
        <Route path="/articles/:id" element={<SingleArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
