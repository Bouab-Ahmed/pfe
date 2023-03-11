import React from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const DropList = ({ item, categories }) => {
  const [openMenu, setOpenMenu] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenMenu(true),
    onMouseLeave: () => setOpenMenu(false),
  };

  return (
    <Menu open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Button
          {...triggers}
          variant='text'
          className='flex items-center gap-1 font-semibold text-[#222222] px-4'>
          {item}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList {...triggers} className='w-fit overflow-visible lg:grid'>
        <ul className='flex w-full flex-col'>
          {categories?.map(({ name, path }) => (
            <Link to={path} key={name}>
              <MenuItem>
                <Typography variant='h6' color='blue-gray' className='mb-1'>
                  {name}
                </Typography>
              </MenuItem>
            </Link>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
};

export default DropList;
