import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
