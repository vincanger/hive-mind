import React from 'react'
import './Main.css'
import NavBar from './components/NavBar'
import TaskForm from './components/TaskForm'

const MainPage = () => {
  return (
    <div className='container'>
      <NavBar />
      <main>
        <TaskForm />
      </main>
    </div>
  );
}
export default MainPage
