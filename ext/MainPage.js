import React from 'react'
import waspLogo from './waspLogo.png'
import './Main.css'
import TaskForm from './components/TaskForm'

const MainPage = () => {
  return (
    <div className="container">
      <main>
        <div className="logo">
          <img src={waspLogo} alt="wasp" />
        </div>

        <h2 className="welcome-title"> Welcome to HiveMind</h2>
        <TaskForm />

        <div className="buttons">
          <a
            className="button button-filled"
            href="https://wasp-lang.dev/docs/tutorials/todo-app"
            target="_blank"
            rel="noreferrer noopener"
          >
            Take the Tutorial
          </a>
          <a
            className="button button-outline"
            href="https://discord.com/invite/rzdnErX"
            target="_blank"
            rel="noreferrer noopener"
          >
            Chat on Discord
          </a>
        </div>
      </main>
    </div>
  )
}
export default MainPage
