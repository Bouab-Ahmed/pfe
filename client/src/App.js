import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/navbar/Header";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import Otp from "./pages/Otp";

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
// import { useSelector } from "react-redux";
import PageDetails from "./pages/PageDetails";
import NewPost from "./pages/NewPost";

function App() {
  const user = localStorage.getItem("user");
  return (
    <div>
      <div className="mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute />} />
          <Route
            path={"/auth/login"}
            element={user ? <ProtectedRoute /> : <Login />}
          />
          <Route
            path={"/auth/register"}
            element={user ? <ProtectedRoute /> : <Register />}
          />
          <Route path={"/auth/verifyEmail"} element={<Otp />} />
          <Route path="/posts/:id" element={<PageDetails />} />
          <Route path="/newPost" element={<NewPost />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
