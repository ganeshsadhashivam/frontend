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
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="new" element={<NewTeamForm />} />
        <Route index element={<LeagueStandings />} />  */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
