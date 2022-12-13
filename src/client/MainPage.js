import React from 'react';
import './Main.css';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import MobileFooter from './components/MobileFooter';

const MainPage = () => {
  return (
    <div className='container'>
      <NavBar />
      <main>
        <TaskForm />
      </main>
      <MobileFooter />
    </div>
  );
};
export default MainPage;
