import { sendTaskReminder } from '@wasp/jobs/sendTaskReminder.js';

export async function findTasksToSend(args, context) {
  console.log('\n::: Pending Tasks Worker Function - Begin :::', args, context, '\n');
  const currentDay = new Date().getDay(); // e.g. 1 (Monday), 2 (Tuesday), etc.
  const currentDate = new Date().toJSON().split('T')[0]; // e.g. '2022-11-08'
  console.log('current date', currentDate);
  console.log('current day of week', currentDay);

  const deadlinedTasks = await context.entities.Task.findMany({
    where: {
      deadline: currentDate,
      status: 'pending',
    },
  });

  const recurringTasks = await context.entities.Task.findMany({
    where: {
      recurring: {
        has: currentDay,
      },
      status: 'pending',
    },
  });

  const allTasks = [...deadlinedTasks, ...recurringTasks];
  if (allTasks.length === 0) {
    console.log('No tasks to send emails for!');
    return;
  }

  const submittedJobs = await Promise.allSettled(
    allTasks.map(async (task) => {
      try {
        const submittedJob = await sendTaskReminder.submit(task);
        console.log('details of submitted job -->', await submittedJob.pgBoss.details());
        return;
      } catch (error) {
        console.error('Error submitting job', task.id, error);
      }
    })
  );

  console.log('\n::: Pending Tasks Worker Function - End :::\n');
  return submittedJobs;
}
