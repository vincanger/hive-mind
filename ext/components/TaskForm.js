import React from 'react';
import { CgInfo } from 'react-icons/cg';
import Tooltip from 'react-simple-tooltip';
import createTask from '@wasp/actions/createTask';

const daysOfWeek = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
let days, deadline;

const TaskForm = () => {
  const [recurring, setRecurring] = React.useState(false);

  React.useEffect(() => {
    days = daysOfWeek.map((day) => {
      return document.getElementById(day);
    });
    deadline = document.getElementById('deadline');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const name = event.target.name.value;
      const email = event.target.email.value;
      const message = event.target.message.value;
      const deadline = event.target.deadline?.value;
      // Map the days of the week to their index number
      // for storage in db, e.g. [0: Su, 1:M, ...]]
      const recurring = days.filter((day) => day.checked).map((day) => daysOfWeek.findIndex((d) => d === day.id));

      const task = await createTask({ name, email, message, deadline, recurring });
      console.log('Task created: ', task);
      window.alert('Task created successfully!');
      setRecurring(false);
      event.target.reset();
    } catch (err) {
      // parse the thrown error from createAction within actions.js
      window.alert(err.data.message);
  };

  }

  const isRecurring = (event) => {
    console.log('deadline', deadline);
    if (event.target.checked) {
      setRecurring(true);
      deadline.value = null;
    } else {
      const checkedDays = days.filter((day) => day.checked);
      console.log('checked days', checkedDays);
      if (checkedDays.length === 0) {
        setRecurring(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Tooltip
          style={{ width: '10px'}}
          content='An email reminder will be sent on the deadline or recurring days
          you select...'
          placement='bottom'
        >
          <CgInfo />
        </Tooltip>
        <h3 style={{ display: 'inline-block' }}>Schedule a Task Reminder:</h3>
      </div>
      <span className='info'></span>
      <label htmlFor='name'>Task</label>
      <input type='text' id='name' placeholder='name of task' />
      <label htmlFor='email'>Email of Responsible Person</label>
      <input type='email' id='email' placeholder='email address' />
      <label htmlFor='message'>Message</label>
      <input type='text' id='message' placeholder='message to be sent' />
      <div>
        <label htmlFor='deadline'>One-time Deadline: </label>
        <input type='date' id='deadline' disabled={recurring} />
      </div>
      <div className='recurring'>
        <label>Recurring task:</label>

        {daysOfWeek.map((day, index) => (
          <label key={index} className='days'>
            {day}
            <input type='checkbox' onChange={isRecurring} id={day} />
          </label>
        ))}
      </div>
      <button type='submit' className='button button-outline'>
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
