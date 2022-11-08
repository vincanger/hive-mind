import React from 'react';
import './Main.css';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';

const AboutPage = () => {
  return (
    <div className='container'>
      <NavBar />
      <main>
        <span>🐢🐢🐢🐢🐢🐢🐢</span>
        <div className='buttons'>
          <a
            className='button button-filled'
            href='https://wasp-lang.dev/docs/tutorials/todo-app'
            target='_blank'
            rel='noreferrer noopener'
          >
            Take the Tutorial
          </a>
          <a
            className='button button-outline'
            href='https://discord.com/invite/rzdnErX'
            target='_blank'
            rel='noreferrer noopener'
          >
            Chat on Discord
          </a>
        </div>
      </main>
    </div>
  );
};
export default AboutPage;
