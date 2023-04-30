import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/navbar/Header";
<<<<<<< HEAD
<<<<<<< HEAD
// import Feeds from './pages/Feeds';
// import Home from './pages/Home';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import Otp from "./pages/Otp";
import Verify from "./pages/verify";
import { useSelector } from "react-redux";
import { getUser } from "./features/auth/authSlice";
=======
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import Otp from "./pages/Otp";
>>>>>>> 7a8f65622e6c061543520b41b1faf7426cb7f684
=======
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import Otp from "./pages/Otp";
>>>>>>> 7a8f65622e6c061543520b41b1faf7426cb7f684
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
function App() {
  const user = localStorage.getItem("user");
  return (
    <div>
      <div className="mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute user={user} />} />
          <Route path={"/auth/login"} element={<Login />} />
          <Route path={"/auth/register"} element={<Register />} />
          <Route path={"/auth/otp"} element={<Otp />} />
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="/auth/verify" element={<Verify />} />

=======
>>>>>>> 7a8f65622e6c061543520b41b1faf7426cb7f684
=======
>>>>>>> 7a8f65622e6c061543520b41b1faf7426cb7f684
          {/* <Route path={'/feeds'} element={<Feeds />} /> */}
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
