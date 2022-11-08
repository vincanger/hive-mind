import nodemailer from 'nodemailer';

export async function workerFunction(args, context) {
  console.log('\n::: Pending Tasks Worker Function - Begin :::', args, context, "\n");
  const currentDay = new Date().getDay();                 // e.g. 1 (Monday), 2 (Tuesday), etc.
  const currentDate = new Date().toJSON().split('T')[0];  // e.g. '2022-11-08'
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
        has: 1,
      }
    }
  });

  const allTasks = [...deadlinedTasks, ...recurringTasks];
  console.log('all tasks', allTasks);

  return Promise.all(allTasks.map(task => {
    return sendEmail(task);
  }))
}

export async function sendEmail({ email, message, name }) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"HiveMind" <hive.mind@example.com>',
    to: email,
    subject: `Task Reminder -- ${name}`,
    html: `${message}`,
  });

  console.log(`Email URL: ${nodemailer.getTestMessageUrl(info)}`);
}
