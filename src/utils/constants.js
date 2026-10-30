
export const PRIORITIES = [
  { id: "high", label: "High", color: "rose", bg: "bg-rose-50 text-rose-700 ring-rose-200" },
  { id: "medium", label: "Medium", color: "amber", bg: "bg-amber-50 text-amber-700 ring-amber-200" },
  { id: "low", label: "Low", color: "emerald", bg: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
];

export const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    dotColor: "bg-indigo-500",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    accentBorder: "border-indigo-400",
  },
  {
    id: "in-progress",
    title: "In Progress",
    dotColor: "bg-amber-500",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    accentBorder: "border-amber-400",
  },
  {
    id: "completed",
    title: "Completed",
    dotColor: "bg-emerald-500",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentBorder: "border-emerald-400",
  },
];