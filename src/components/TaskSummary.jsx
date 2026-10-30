import { CheckCircle2, Clock, ListTodo, TrendingUp } from "lucide-react";
import { getTaskStats } from "../utils/taskStats";

const TaskSummary = ({ tasks }) => {
  const { total, completed, inProgress, todo, progress } = getTaskStats(tasks);

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      subtext: `${inProgress} in progress`,
      icon: ListTodo,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      label: "To Do & In Progress",
      value: todo + inProgress,
      subtext: `${todo} pending, ${inProgress} active`,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      label: "Completed",
      value: completed,
      subtext: `${progress}% completion rate`,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  return (
    <section className="mb-6 space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <article
              key={stat.label}
              className={`rounded-2xl border ${stat.border} bg-white p-4 shadow-sm transition hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
                  {stat.label}
                </p>
                <div className={`rounded-xl ${stat.bg} p-2 ${stat.color}`}>
                  <IconComponent size={18} />
                </div>
              </div>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {stat.subtext}
              </p>
            </article>
          );
        })}
      </div>

      {/* Overall Progress Bar */}
      {total > 0 && (
        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xs">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp size={14} className="text-violet-600" /> Overall Board Progress
            </span>
            <span className="text-violet-700 font-bold">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-linear-to-r from-violet-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskSummary;
