import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Creators from "./pages/Creators";
import UpdateBlog from "./dashboard/UpdateBlog";
import Details from "./pages/Details";
import { useAuth } from "./context/AuthProvider";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";

function App() {
  const { isAutheticated } = useAuth();
  const navigate = useNavigate();
  console.log("chutnesssss", isAutheticated);
  const location = useLocation();
  const hiddenNvbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  return (
    <>
      {!hiddenNvbarFooter && <Navbar />}
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28">
          <Routes>
            <Route
              exact
              path="/"
              element={
                isAutheticated === true ? (
                  <Home />
                ) : (
                  navigate("/login") || navigate("/register")
                )
              }
            />
            <Route exact path="/terms" element={<Terms />} />
            <Route exact path="/blogs" element={<Blogs />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/creators" element={<Creators />} />
            <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
            <Route exact path="/blog/:id" element={<Details />} />

            <Route exact path="/register" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {!hiddenNvbarFooter && <Footer />}
    </>
  );
}

export default App;
