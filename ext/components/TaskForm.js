import React from 'react';
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
    console.log('days', days.map(d => d.id));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const name = event.target.name.value;
      const email = event.target.email.value;
      const message = event.target.message.value;
      const deadline = event.target.deadline?.value;


      const recurring = days
        .filter((day) => day.checked)
        .map((day) => daysOfWeek.findIndex((d) => d === day.id));

      console.log('recurring', recurring);
      console.log('deadline', deadline);
      console.log('name', name);
      console.log('email', email);
      console.log('message', message);

      await createTask({ name, email, message, deadline, recurring });
      // event.target.reset();
    } catch (err) {
      window.alert('Error: ' + err.message);
    }
  };

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

  // return a form with a text input and a submit button
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Task</label>
      <input type='text' id='name' placeholder='name' />
      <label htmlFor='email'>Email of Responsible Person</label>
      <input type='email' id='email' placeholder='email address' />
      <label htmlFor='message'>Message</label>
      <input type='text' id='message' placeholder='message' />
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
