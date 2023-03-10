import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Feeds from './pages/Feeds';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register.jsx';
function App() {
  return (
    <>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={'/auth/login'} element={<Login />} />
          <Route path={'/auth/register'} element={<Register />} />
          <Route path={'/feeds'} element={<Feeds />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
