import React from 'react';

const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
let days, deadline;

const TaskForm = () => {
  const [recurring, setRecurring] = React.useState(false);

  React.useEffect(() => {
    days = daysOfWeek.map((day) => {
      return document.getElementById(day);
    });
    deadline = document.getElementById('deadline');
  }, []);

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
    <form>
      <label htmlFor='name'>Task</label>
      <input type='text' id='name' placeholder='name' />
      <label htmlFor='email'>Email of Responsible Person</label>
      <input type='email' id='email' placeholder='email address' />
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
