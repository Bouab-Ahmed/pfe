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
          className='flex items-center gap-1 font-semibold text-textColor px-4 hover:bg-primary hover:bg-opacity-10 hover:border-0 hover:outline-none hover:ring-0 border-0 outline-none ring-0'>
          {item}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList {...triggers} className='w-fit overflow-visible'>
        <ul className='flex w-full flex-col hover:border-0 hover:outline-none hover:ring-0 border-0 outline-none ring-0'>
          {categories?.map(({ name, path }) => (
            <MenuItem className='hover:bg-primary hover:bg-opacity-10'>
              <Link to={path} key={name}>
                <Typography variant='h6' className='text-textColor'>
                  {name}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
};

export default DropList;
