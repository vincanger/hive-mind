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
    }
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
    }
  });
};
