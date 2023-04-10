import React from 'react';
import hero from '../../assets/hero-devices.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col md:flex-row items-center justify-between h-[90vh] mx-10'>
      <div className='flex flex-col items-start justify-start h-[60%] w-[55%]'>
        <h1 className='text-6xl font-bold text-primary font-DINRoundPro leading-[70px] w-3/4'>
          Hi, we're Knowledge hub.
        </h1>
        <div className='my-4'>
          <p className='text-3xl text-textColor tracking-wide my-2'>
            The world's most-loved social storytelling platform
          </p>
          <p className='text-2xl text-textColorLight tracking-wide my-4'>
            Wattpad connects a global community of 90 million readers and
            writers through the power of story.
          </p>
        </div>
        <div className='flex gap-4'>
          <button
            className='bg-primary text-white font-bold py-2 px-8 rounded-md'
            onClick={() => {
              navigate('/auth/register?role=writer');
            }}>
            start writing
          </button>
          <button
            className='bg-primary text-white font-bold py-2 px-8 rounded-md'
            onClick={() => {
              navigate('/auth/register?role=reader');
            }}>
            start reading
          </button>
        </div>
      </div>
      <div className='w-[45%]'>
        <img src={hero} alt='hero' />
      </div>
    </div>
  );
};

export default Hero;
