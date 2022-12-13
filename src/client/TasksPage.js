import React from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPendingTasks from '@wasp/queries/getPendingTasks';
import getCompletedTasks from '@wasp/queries/getCompletedTasks';

const daysOfWeek = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

const TasksPage = () => {
  const { data: tasks, error, isLoading } = useQuery(getPendingTasks);
  const { data: compTasks, error: compError, isLoading: compLoading } = useQuery(getCompletedTasks);

  // TODO: add pagination and sorting by status, recurring, etc, instead of two lists

  return (
    <Layout>
      <Link to='/' style={{ marginTop: '0.5rem' }}>
        Go back and add a Task 🐢
      </Link>
      <div className='tasks'>
        {isLoading && compLoading && <div>Loading...</div>}
        {error || (compError && <div>Error: {error}</div>)}
        {tasks && (
          <div style={{ marginBottom: '0.25rem' }}>
            <h2>Pending Tasks</h2>
            <ol>
              {tasks.map((task, idx) => (
                <>
                  <li key={task.id}>
                    <code>{task.name}</code>
                  </li>
                  <div>{task.email}</div>
                  {task.recurring.length > 0 && (
                  <div>
                    <em>Recurring:</em>{' '}
                    {task.recurring.map((day) => daysOfWeek.filter((d, idx) => day === idx)).join('-')}
                  </div>)}
                  {task.deadline && <div><em>Deadline:</em> {task.deadline}</div>}
                </>
              ))}
            </ol>
          </div>
        )}
        {compTasks && (
          <div style={{ opacity: '0.6' }}>
            <h2>Completed Tasks</h2>
            <ol>
              {compTasks.map((task, idx) => (
                <div>
                  <li key={task.id} style={{ textDecoration: 'line-through' }}>
                    {task.name}
                  </li>
                  <div>{task.email}</div>
                  <div style={{ marginBottom: '0.25rem' }}>{task.message}</div>
                </div>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div>
        <h3>CRON JOB EMAIL previews from Nodemailer</h3>
        <ul>
          {tasks &&
            tasks.map((task, idx) => {
              if (task.emailUrl) {
                return (
                  <>
                    <li key={task.id}>
                      <code>{task.name}</code>:
                      <a target='_blank' rel='noreferrer' href={task.emailUrl}>
                        nodemailer email preview'
                      </a>
                    </li>
                  </>
                );
              } else {
                return null;
              }
            })}
        </ul>
      </div>
    </Layout>
  );
};
export default TasksPage;
