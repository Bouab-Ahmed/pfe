import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../../components/Spinner';
import { registerUser, reset } from '../../features/auth/authSlice';

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'password2':
      return { ...state, password2: action.payload };
    default:
      return state;
  }
};

function Register() {
  const [state, localDispatch] = useReducer(reducer, {
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [cardId, setCardId] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success('Registration successful');
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const onChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCardId(base64);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    if (state.password !== state.password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name: state.name,
        email: state.email,
        password: state.password,
        cardId: cardId,
      };
      // console.log(userData);
      dispatch(registerUser(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1 className='flex items-center justify-start gap-4'>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={state.name}
              placeholder='Enter your name'
              onChange={(e) =>
                localDispatch({ type: 'name', payload: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={state.email}
              placeholder='Enter your email'
              onChange={(e) =>
                localDispatch({ type: 'email', payload: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={state.password}
              placeholder='Enter password'
              onChange={(e) =>
                localDispatch({ type: 'password', payload: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={state.password2}
              placeholder='Confirm password'
              onChange={(e) =>
                localDispatch({ type: 'password2', payload: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <input
              type='file'
              className='form-control'
              id='file'
              name='file'
              placeholder='upload ur id card'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
