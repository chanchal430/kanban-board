export const getTaskStats = (tasks) => {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.status === "completed").length;

  const inProgress = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const todo = tasks.filter((task) => task.status === "todo").length;

  const remaining = total - completed;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    inProgress,
    todo,
    remaining,
    progress,
  };
};
