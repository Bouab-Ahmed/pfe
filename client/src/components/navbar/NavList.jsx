import { Typography } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';
import navItems from '../../shared/navitems';
import DropList from './DropList';

const NavList = () => {
  return (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-center lg:gap-2'>
      {navItems.map((item, i) =>
        item.name === 'Browse' ? (
          <DropList item={item.name} categories={item.categories} key={i} />
        ) : item.name === 'Language' ? (
          <DropList item={item.name} categories={item.languages} key={i} />
        ) : (
          <Typography
            as='li'
            variant='small'
            color='blue-gray'
            className='font-semibold text-base'
            key={i}>
            <Link to={item.path} className='mb-1 flex items-center'>
              {item.name}
            </Link>
          </Typography>
        )
      )}
    </ul>
  );
};

export default NavList;
