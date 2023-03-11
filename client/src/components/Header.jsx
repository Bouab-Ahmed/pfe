import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../features/auth/authSlice';
import logo from '../assets/logo.png';
import NavList from './NavList';
import { useState, useEffect } from 'react';
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from '@material-tailwind/react';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState(false);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className='mx-auto w-[100vw] py-2 px-4 lg:px-8 lg:py-2 rounded-none shadow-sm'>
      <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
        <div className='h-10 cursor-pointer' onClick={() => navigate('/')}>
          <img src={logo} alt='logo' className='w-full h-full' />
        </div>
        <div className='flex items-center justify-between gap-3'>
          <div className='hidden lg:block'>
            <NavList />
          </div>
          {user ? (
            <Button
              size='sm'
              className='hidden lg:inline-block bg-gradient-to-r to-[#F9533E] from-yellow-900 px-6'
              onClick={onLogout}>
              <span>Log out</span>
            </Button>
          ) : (
            <Button
              size='sm'
              className='hidden lg:inline-block bg-gradient-to-r to-[#F9533E] from-yellow-900 px-6'
              onClick={() => navigate('/auth/login')}>
              <span>Login</span>
            </Button>
          )}
        </div>
        <IconButton
          variant='text'
          className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              className='h-6 w-6'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className='container mx-auto'>
          <NavList />
          <Button
            size='sm'
            fullWidth
            className='mb-2 bg-gradient-to-r to-[#F9533E] from-yellow-900'>
            <span>Login</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default Header;
