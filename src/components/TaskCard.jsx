import { useState } from "react";
import { AlertTriangle, Calendar, Flag, Pencil, Trash2 } from "lucide-react";
import { useTasksDispatch } from "../context/TasksContext";
import { COLUMNS } from "../utils/constants";
import { toast } from "react-toastify";

const priorityConfig = {
  high: {
    label: "High",
    badge: "bg-rose-50 text-rose-700 ring-rose-200 border-rose-200",
    dot: "bg-rose-500",
  },
  medium: {
    label: "Medium",
    badge: "bg-amber-50 text-amber-700 ring-amber-200 border-amber-200",
    dot: "bg-amber-500",
  },
  low: {
    label: "Low",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200 border-emerald-200",
    dot: "bg-emerald-500",
  },
};

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useTasksDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const priorityKey = (task.priority || "medium").toLowerCase();
  const priorityInfo = priorityConfig[priorityKey] || priorityConfig.medium;

  // Calculate due date status
  const getDueDateStatus = (dueDateString) => {
    if (!dueDateString) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = dueDateString.split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
      return { label: dueDateString, isUpcoming: true };
    }

    const [year, month, day] = parts;
    if (year > 2100 || year < 2000) {
      return { label: dueDateString, isUpcoming: true };
    }

    const dueDate = new Date(year, month - 1, day);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: `Overdue (${Math.abs(diffDays)}d)`, isOverdue: true };
    } else if (diffDays === 0) {
      return { label: "Due Today", isDueToday: true };
    } else if (diffDays === 1) {
      return { label: "Due Tomorrow", isUpcoming: true };
    } else {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return { label: `${monthNames[month - 1]} ${day}, ${year}`, isUpcoming: true };
    }
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);

  const handleDelete = () => {
    dispatch({
      type: "DELETE",
      payload: task.id,
    });
    setShowConfirmDelete(false);
    toast.error(`Deleted "${task.title}"`);
  };

  const handleStatusChange = () => {
    dispatch({
      type: "MOVE",
      payload: task.id
    });
    toast.success(`Task moved`)
  }

  return (
    <article
      draggable
      onDragStart={(event) => {
        setIsDragging(true);
        event.dataTransfer.setData("taskId", task.id);
        event.dataTransfer.effectAllowed = "move";
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`group relative rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md ${isDragging ? "opacity-40 scale-95 ring-2 ring-violet-400" : ""
        }`}
    >
      {/* Top row: Priority & Due Date */}
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-bold ring-1 ${priorityInfo.badge}`}
        >
          <Flag size={11} />
          {priorityInfo.label}
        </span>

        {dueDateStatus ? (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${dueDateStatus.isOverdue
              ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
              : dueDateStatus.isDueToday
                ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                : "bg-slate-50 text-slate-500"
              }`}
          >
            {dueDateStatus.isOverdue ? (
              <AlertTriangle size={12} className="text-rose-600" />
            ) : (
              <Calendar size={12} className="text-slate-400" />
            )}
            {dueDateStatus.label}
          </span>
        ) : (
          <span className="text-[11px] text-slate-400">No due date</span>
        )}
      </div>

      {/* Task Title */}
      <h3 className="break-words text-sm font-bold leading-snug text-slate-900 group-hover:text-violet-900">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="mt-1.5 line-clamp-2 break-words text-xs leading-relaxed text-slate-500">
          {task.description}
        </p>
      )}

      {/* Delete confirmation banner inline if clicked */}
      {showConfirmDelete ? (
        <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50/90 p-2.5 text-center animate-in fade-in">
          <p className="text-xs font-semibold text-rose-800">
            Delete this task?
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setShowConfirmDelete(false)}
              className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-rose-700 shadow-xs"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        /* Footer: Status controls and action buttons */
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
          {/* Quick Column Switch Dropdown / Nav */}
          <div className="flex items-center gap-1">
            <select
              value={task.status}
              onChange={handleStatusChange}
              aria-label="Change status"
              className="rounded-lg border border-slate-200 bg-slate-50/70 px-2 py-1 text-[11px] font-semibold text-slate-700 outline-none hover:bg-slate-100 focus:border-violet-400 focus:bg-white"
            >
              {COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>

          </div>

          {/* Action buttons: Edit & Delete */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(task)}
              title="Edit Task"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
            >
              <Pencil size={14} />
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmDelete(true)}
              title="Delete Task"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default TaskCard;
