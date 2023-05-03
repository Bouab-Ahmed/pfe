import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/navbar/Header";
// import Feeds from './pages/Feeds';
// import Home from './pages/Home';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import Otp from "./pages/Otp";
import Verify from "./pages/verify";

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
          <Route path={"/auth/verifyEmail"} element={<Otp />} />

          <Route path="/auth/verify" element={<Verify />} />

          {/* <Route path={'/feeds'} element={<Feeds />} /> */}
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
