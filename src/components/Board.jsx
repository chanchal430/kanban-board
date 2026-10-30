import { useState } from "react";
import { SearchX } from "lucide-react";
import { COLUMNS } from "../utils/constants";
import Column from "./Column";
import Filter from "./Filter";

const initialFilters = {
  search: "",
  priority: "All",
  status: "All",
};

const Board = ({ onEdit, onAddTaskToColumn, tasks }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const activeFilterCount =
    (filters.search.trim() !== "" ? 1 : 0) +
    (filters.priority !== "All" ? 1 : 0) +
    (filters.status !== "All" ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  const filteredTasks = tasks.filter((task) => {
    const searchTrimmed = filters.search.trim().toLowerCase();
    const matchesSearch =
      searchTrimmed === "" ||
      task.title.toLowerCase().includes(searchTrimmed) ||
      (task.description && task.description.toLowerCase().includes(searchTrimmed));

    const matchesPriority =
      filters.priority === "All" ||
      (task.priority && task.priority.toLowerCase() === filters.priority.toLowerCase());

    const matchesStatus =
      filters.status === "All" || task.status === filters.status;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div>
      <Filter
        filters={filters}
        onChange={handleFilterChange}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
        activeCount={activeFilterCount}
      />

      {/* Global No-Results State when filters match nothing */}
      {hasActiveFilters && filteredTasks.length === 0 && (
        <div className="mb-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <SearchX size={26} />
          </div>
          <h3 className="mt-3 text-base font-bold text-slate-800">
            No matching tasks found
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-500">
            We couldn't find any tasks matching your search query or selected filter criteria.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-violet-700"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Board Columns Grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            onEdit={onEdit}
            onAddTaskToColumn={onAddTaskToColumn}
            tasks={filteredTasks.filter((task) => task.status === column.id)}
            hasActiveFilters={hasActiveFilters}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
