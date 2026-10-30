import { useState } from "react";
import { Plus } from "lucide-react";
import { useTasksDispatch } from "../context/TasksContext";
import TaskCard from "./TaskCard";
import { toast } from "react-toastify";

const Column = ({ column, tasks, onEdit, onAddTaskToColumn, hasActiveFilters }) => {
  const dispatch = useTasksDispatch();
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    // Only reset if leaving the column itself, not entering children
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOver(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsOver(false);

    const taskId = event.dataTransfer.getData("taskId");
    if (!taskId) return;

    dispatch({
      type: "MOVE",
      payload: {
        id: taskId,
        status: column.id,
      },
    });

    toast.info(`Task moved to ${column.title}`);
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col min-h-[460px] rounded-2xl border transition-all duration-200 p-3.5 sm:p-4 ${
        isOver
          ? "border-violet-500 bg-violet-50/60 ring-2 ring-violet-200 shadow-md"
          : "border-slate-200/90 bg-slate-50/90 shadow-2xs"
      }`}
    >
      {/* Column Header */}
      <div className="mb-3.5 flex items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              column.dotColor || "bg-slate-400"
            }`}
          />
          <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
            {column.title}
          </h2>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-600 shadow-2xs ring-1 ring-slate-200">
            {tasks.length}
          </span>
        </div>

        {/* Quick add button for this column */}
        <button
          type="button"
          onClick={() => onAddTaskToColumn(column.id)}
          title={`Add task to ${column.title}`}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-2xs transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 active:scale-95"
        >
          <Plus size={15} />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 space-y-3">
        {tasks.length === 0 ? (
          <div
            className={`flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed p-4 text-center transition ${
              isOver
                ? "border-violet-400 bg-violet-100/40 text-violet-700"
                : "border-slate-300 bg-white/60 text-slate-500"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {hasActiveFilters ? "No Matching Tasks" : "Empty Lane"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {hasActiveFilters
                ? "Try adjusting search or priority filters."
                : "Drag tasks here or click '+' above to add."}
            </p>
            {!hasActiveFilters && (
              <button
                type="button"
                onClick={() => onAddTaskToColumn(column.id)}
                className="mt-3 inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-violet-400 hover:text-violet-600 transition"
              >
                <Plus size={13} /> Add Task
              </button>
            )}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))
        )}
      </div>
    </section>
  );
};

export default Column;
