import nodemailer from 'nodemailer';

export async function emailSender(task, context) {
  console.log('\n::: Email Sender Worker Function - Begin :::', '\n');
  let sentEmailURL;
  try {
    sentEmailURL = await sendEmail(task);
    if (task.deadline.length) {
      await markAsCompleted(task, context);
    }
    await updateEmailUrl(task, context);
  } catch (error) {
    console.error('Error sending email', task.id, error);
  }
  console.log('\n::: Email Sender Worker Function - End :::\n');
  return sentEmailURL;
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
  const url = nodemailer.getTestMessageUrl(info);
  console.log(`${task.name} email sent! URL: ${url}`);
  return url;
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

async function updateEmailUrl(task, context) {
  return await context.entities.Task.update({
    where: {
      id: task.id,
    },
    data: {
      emailUrl: sentEmailURL,
    },
  });
}