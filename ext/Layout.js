import React from 'react';
import NavBar from './components/NavBar';
import MobileFooter from './components/MobileFooter';

const Layout = ({ children }) => {
  return (
    <div className='container'>
      <NavBar />
      <main>
        {children}
      </main>
      <MobileFooter />
    </div>
  );
};
export default Layout;
