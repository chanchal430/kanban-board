import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AlertCircle, Calendar, Flag, Sparkles, X } from "lucide-react";
import { useTasksDispatch } from "../context/TasksContext";
import { COLUMNS, PRIORITIES } from "../utils/constants";
import { toast } from "react-toastify";

const TaskForm = ({ task, onClose }) => {
  const dispatch = useTasksDispatch();
  const isEditing = Boolean(task);
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      status: "todo",
    },
  });

  const titleValue = useWatch({ control, name: "title" }) || "";
  const descValue = useWatch({ control, name: "description" }) || "";

  useEffect(() => {
    if (task) {
      reset({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority ? task.priority.toLowerCase() : "medium",
        dueDate: task.dueDate || "",
        status: task.status || "todo",
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        status: "todo",
      },
      );
    }
  }, [task, reset]);

  const onSubmit = (data) => {
    const trimmedTitle = data.title.trim();
    const trimmedDescription = data.description ? data.description.trim() : "";

    if (!trimmedTitle) return;

    if (isEditing) {
      dispatch({
        type: "EDIT",
        payload: {
          ...task,
          title: trimmedTitle,
          description: trimmedDescription,
          priority: data.priority.toLowerCase(),
          dueDate: data.dueDate,
          status: data.status,
        },
      });
      toast.success("Task updated successfully!");
    } else {
      dispatch({
        type: "ADD",
        payload: {
          id: crypto.randomUUID(),
          title: trimmedTitle,
          description: trimmedDescription,
          priority: data.priority.toLowerCase(),
          dueDate: data.dueDate,
          status: data.status,
        },
      });
      toast.success("Task created successfully!");
    }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10"
      >
        {/* Modal Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-slate-100 px-6 py-4.5 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <Sparkles size={14} />
              </span>
              <h2 id="modal-title" className="text-lg font-bold text-slate-900">
                {isEditing ? "Edit Task" : "Create New Task"}
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {isEditing
                ? "Update your task details and column status."
                : "Add a new task to your Kanban workflow."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="space-y-4 overflow-y-auto px-6 py-5">
            {/* Title */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="task-title"
                  className="text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Task Title <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {titleValue.length}/100
                </span>
              </div>
              <input
                id="task-title"
                type="text"
                autoFocus
                placeholder="e.g. Design responsive landing page"
                {...register("title", {
                  required: "Task title is required",
                  validate: (v) =>
                    v.trim().length > 0 || "Title cannot be empty or just whitespace",
                  maxLength: {
                    value: 100,
                    message: "Title cannot exceed 100 characters",
                  },
                })}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:ring-2 ${errors.title
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
                  : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
              />
              {errors.title && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                  <AlertCircle size={13} /> {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="task-description"
                  className="text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Description
                </label>
                <span className="text-[11px] text-slate-400">
                  {descValue.length}/500
                </span>
              </div>
              <textarea
                id="task-description"
                rows={3}
                placeholder="Add context, acceptance criteria, or links..."
                {...register("description", {
                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters",
                  },
                })}
                className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
              {errors.description && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                  <AlertCircle size={13} /> {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  <Flag size={13} className="text-slate-400" />
                  Priority
                </label>
                <select
                  id="task-priority"
                  {...register("priority", { required: true })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} Priority
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-due-date"
                  className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  <Calendar size={13} className="text-slate-400" />
                  Due Date
                </label>
                <input
                  id="task-due-date"
                  type="date"
                  {...register("dueDate")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="task-status"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                status
              </label>
              <select
                id="task-status"
                {...register("status", { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              >
                {COLUMNS.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex shrink-0 items-center justify-end gap-2.5 border-t border-slate-100 bg-slate-50/80 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50"
            >
              {isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
