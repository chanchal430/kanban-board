import { Search, X } from "lucide-react";
import { COLUMNS, PRIORITIES } from "../utils/constants";

const Filter = ({ filters, onChange, onClear, hasActiveFilters }) => {
  const selectClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100";

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search Input with inline clear */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
            placeholder="Search tasks by title..."
            aria-label="Search tasks by title"
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-9 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onChange("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
            <select
              value={filters.priority}
              onChange={(e) => onChange("priority", e.target.value)}
              aria-label="Filter by priority"
              className={selectClass}
            >
              <option value="All">All Priorities</option>
              {PRIORITIES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} Priority
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => onChange("status", e.target.value)}
              aria-label="Filter by status"
              className={selectClass}
            >
              <option value="All">All Columns</option>
              {COLUMNS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-100 active:scale-95"
            >
              <X size={14} />
              <span>Clear filters {activeCount > 0 ? `(${activeCount})` : ""}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Filter;
