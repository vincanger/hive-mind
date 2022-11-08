export const createTask = async ({ name, email, message, deadline, recurring }, context) => {
  // if (!context.user) {
  //   throw new HttpError(401);
  // }
  return context.entities.Task.create({
    data: {
      name,
      email,
      message,
      deadline,
      recurring,
      // user: { connect: { id: context.user.id } },
    },
  });
};
