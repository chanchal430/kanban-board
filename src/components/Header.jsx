import { Plus, Sparkles } from "lucide-react";

const Header = ({ onAddTask, taskCount }) => {

  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
            <Sparkles size={12} /> SPRINT WORKSPACE
          </span>
          <span className="text-xs font-medium text-slate-500">
            {taskCount} {taskCount === 1 ? "task" : "tasks"}
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Kanban Task Board
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Streamline workflow across To Do, In Progress, and Completed.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onAddTask}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
