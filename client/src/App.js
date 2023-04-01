import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/navbar/Header';
import Feeds from './pages/Feeds';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register.jsx';
import Otp from './pages/Otp';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './features/auth/authSlice';
function App() {
  const location = useLocation();
  const user = useSelector(getUser);
  console.log(user);

  return (
    <div
      className={`${
        location.pathname === '/'
          ? 'bg-[url(./assets/heder-bg.png)] bg-no-repeat bg-[right_top_3.7rem]'
          : ''
      }`}>
      <div className='container mx-auto'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={'/auth/login'} element={<Login />} />
          <Route path={'/auth/register'} element={<Register />} />
          <Route path={'/auth/otp'} element={<Otp />} />
          <Route path={'/feeds'} element={<Feeds />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
