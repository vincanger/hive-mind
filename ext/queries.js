export const getPendingTasks = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return await context.entities.Task.findMany({
    where: {
      status: 'pending',
    },
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      recurring: true,
      deadline: true,
      emailUrl: true,
    },
  });
};

export const getCompletedTasks = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return await context.entities.Task.findMany({
    where: {
      status: 'completed',
    },
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
    },
  });
};
