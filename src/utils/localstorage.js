const TASKS_KEY = "tasks";

export function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(TASKS_KEY);

    if (saveTasks === null) return [];

    const parsedTask = JSON.parse(savedTasks);

    return Array.isArray(parsedTask) ? parsedTask : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}
