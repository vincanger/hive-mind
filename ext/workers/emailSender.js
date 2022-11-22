import nodemailer from 'nodemailer';

export async function emailSender(task, context) {
  console.log('\n::: Email Sender Worker Function - Begin :::', '\n');

  try {
    await sendEmail(task);
    if (task.deadline.length) {
      await markAsCompleted(task, context);
    }
  } catch (error) {
    console.error('Error sending email', task.id, error);
  }

  console.log('\n::: Email Sender Worker Function - End :::\n');
  return;
}

async function sendEmail(task) {
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
    to: task.email,
    subject: `Task Reminder -- ${task.name}`,
    html: `${task.message}`,
  });

  console.log(`${task.name} email sent! URL: ${nodemailer.getTestMessageUrl(info)}`);
}

async function markAsCompleted(task, context) {
  return await context.entities.Task.update({
    where: {
      id: task.id,
    },
    data: {
      status: 'completed',
    },
  });
}
