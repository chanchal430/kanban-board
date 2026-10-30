import { useState } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskSummary from "./components/TaskSummary";
import { useTasksState } from "./context/TasksContext";

const App = () => {

  const tasks = useTasksState();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openAddForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  }
  return (
    <main className="min-h-screen bg-slate-100/80 px-4 py-8 text-slate-900 sm:px-6 lg:px-8 font-sans antialiased selection:bg-violet-200">
      <div className="mx-auto max-w-7xl">
        <Header onAddTask={openAddForm} taskCount={tasks.length} />

        <TaskSummary tasks={tasks} />

        <Board
          tasks={tasks}
          onEdit={openEditForm}
          onAddTaskToColumn={openAddForm}
        />

        {isFormOpen && (
          <TaskForm
            task={editingTask}
            onClose={closeForm}
          />
        )}
      </div>
    </main>
  );
};

export default App;
