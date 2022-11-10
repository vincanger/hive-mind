import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useQuery } from '@wasp/queries';
import getPendingTasks from '@wasp/queries/getPendingTasks';
import getCompletedTasks from '@wasp/queries/getCompletedTasks';

const TasksPage = () => {
  const { data: tasks, error, isLoading } = useQuery(getPendingTasks);
  const { data: compTasks, error: compError, isLoading: compLoading } = useQuery(getCompletedTasks);

  // TODO: add pagination and sorting by status, recurring, etc, instead of two lists

  return (
    <div className='container'>
      <NavBar />
      <main >
        <Link to='/' style={{marginTop: '0.5rem'}}>Go back and add a Task 🐢</Link>
        <div className='tasks'>
          {isLoading && compLoading && <div>Loading...</div>}
          {error || (compError && <div>Error: {error}</div>)}
          {tasks && (
            <div>
              <h2>Pending Tasks</h2>
              <ol>
                {tasks.map((task, idx) => (
                  <>
                    <li key={task.id}>{task.name}</li>
                    <div>{task.email}</div>
                    <div style={{ marginBottom: '0.25rem' }}>{task.message}</div>
                  </>
                ))}
              </ol>
            </div>
          )}
          {compTasks && (
            <div style={{opacity: '0.6'}}>
              <h2>Completed Tasks</h2>
              <ol>
                {compTasks.map((task, idx) => (
                  <div >
                    <li key={task.id} style={{textDecoration: 'line-through'}}>{task.name}</li>
                    <div>{task.email}</div>
                    <div style={{ marginBottom: '0.25rem' }}>{task.message}</div>
                  </div>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default TasksPage;
