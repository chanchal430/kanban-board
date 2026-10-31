# 📋 Responsive Kanban Task Board

A responsive, Kanban Task Board built with **React 19**, **Tailwind CSS**, and **Vite**. Designed to manage tasks seamlessly across **To Do**, **In Progress**, and **Completed** workflows with native drag-and-drop, full-text search, multi-criteria filtering, and persistent LocalStorage.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [Repository Link](https://github.com/chanchal430/kanban-board)
- **Live Deployed Link**: [Vercel](https://kanban-board-psi-vert.vercel.app/)
- **Demo Video Walkthrough**: [Video Link](https://drive.google.com/file/d/14_eh8nHg7Gc76wukHGu9ZAlhnqnrSUj_/view?usp=sharing)

---

## 🛠️ Local Development & Scripts

### Prerequisites
- Node.js (v18 or higher recommended)
- npm 

### Installation
```bash
# Clone the repository
git clone https://github.com/chanchal430/kanban-board.git

# Navigate to project directory
cd kanban-board

# Install dependencies
npm install
```

### Running Locally
```bash
# Start development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Quality Checks
```bash
# Run ESLint (must pass with 0 errors)
npm run lint

# Build production bundle
npm run build
```

---

## ✨ Features Checklist

| Feature | Description |
| :--- | :--- |
| **Add Task** | Create tasks with title, description, priority (`low`, `medium`, `high`), due date, and initial column |
| **Edit Task** | Update existing tasks with prepopulated form values and validation feedback |
| **Delete Task** | Safe deletion with inline confirmation dialog to prevent accidental data loss |
| **Status Movement** | Move tasks between columns via **HTML5 Drag-and-Drop** or quick column buttons/select dropdown |
| **Search** | Real-time case-insensitive search by task title and description with instant clear button |
| **Filters** | Filter concurrently by Priority (`All`, `High`, `Medium`, `Low`) and Status Column (`All`, `To Do`, `In Progress`, `Completed`) |
| **Active Filter Badges** | Active filter counter and one-click "Clear filters" action |
| **LocalStorage Persistence** | Board state automatically syncs to `localStorage` and survives page refreshes; auto-populates with starter tasks if empty |
| **Responsive UI** | Fluid layouts optimized for desktop (3-column Kanban grid) and mobile (vertical stacked cards with touch-friendly controls) |
| **UX & Empty States** | Distinct empty states per lane, global "No matching tasks found" banner, and real-time Toast notifications |
| **Form Validation** | Required non-empty title, character counters (100 max title, 500 max description), and due date formatting |

---

## 🏗️ Architecture & Component Structure

```
src/
├── components/
│   ├── Header.jsx         # Board branding, task counts, Reset Demo action, and + Add Task trigger
│   ├── TaskSummary.jsx    # Metric overview cards (Total, In Progress, Completed) & progress bar
│   ├── Filter.jsx         # Search bar (with clear 'X'), Priority & Status dropdowns, and Clear filter chip
│   ├── Board.jsx          # Filter logic, global no-results fallback, and 3-column Kanban grid
│   ├── Column.jsx         # Drag-and-drop drop-target lane, header with counter, quick '+' button & empty state
│   ├── TaskCard.jsx       # Draggable task card, priority pill, overdue date badge, quick column shift, edit/delete
│   └── TaskForm.jsx       # Modal dialog for task creation/editing with React Hook Form validation
├── context/
│   └── TasksContext.jsx   # State management with useReducer & Context API (split state & dispatch)
├── utils/
│   ├── constants.js       # Priority definitions, status lanes, theme tokens, and color styles
│   ├── localstorage.js    # LocalStorage safe serialization, error handling, and starter sample tasks
│   └── taskStats.js       # Task calculation helpers (completion %, counts, remaining)
├── App.jsx                # Application root combining layout, modal management, and context hooks
├── main.jsx               # React DOM root with ToastContainer and provider setup
└── index.css              # TailwindCSS v4 theme 

```
---

## 🧠 State Management & Key Decisions

### 1. Split Context Architecture (`useTasksState` & `useTasksDispatch`)
- **Decision**: Separated `TasksStateContext` from `TasksDispatchContext`.
- **Why**: Components that only dispatch actions (e.g. `Column.jsx` handling drops do not re-render when the task list updates. Only components consuming `useTasksState` re-render on data modifications.

### 2. Predictable State Transitions with `useReducer`
- Actions supported:
  - `ADD`: Inserts a new task at the top of the list.
  - `EDIT`: Immutably updates task properties matching the target ID.
  - `DELETE`: Removes task by ID.
  - `MOVE`: Updates only the task's `status` column.

### 3. Native HTML5 Drag and Drop with Visual Feedback
- `TaskCard` implements `draggable`, setting `dataTransfer.setData("taskId", task.id)`.
- `Column` listens to `onDragOver`, `onDragEnter`, and `onDragLeave` to provide immediate visual cues (highlighted lane border and glowing ring).
- **Mobile Fallback**: Touch screens cannot reliably use desktop drag-and-drop; each card includes a status dropdown so mobile users can move tasks effortlessly.

### 4. Robust LocalStorage Synchronization
- Uses a centralized key (`tasks`).
- `loadTasks()` handles getting tasks from localstorage.
- Wrapped in `try...catch` blocks to protect against storage quota exceeded or disabled storage environments.

---

## 📊 Data Model & Task Schema

```javascript
Task {
  id: string;               // Unique UUID (e.g. crypto.randomUUID())
  title: string;            // Required, max 100 characters (trimmed)
  description?: string;     // Optional, max 500 characters
  priority: 'low' | 'medium' | 'high'; // Priority level
  dueDate?: string;         // ISO date format (YYYY-MM-DD)
  status: 'todo' | 'in-progress' | 'completed'; // Kanban lane ID
}
```

---

## 🛡️ Edge Cases Handled

1. **Whitespace-Only Titles**: Form validates with `value.trim().length > 0`, preventing blank or space-only tasks.
2. **Accidental Deletions**: Inline delete confirmation prompt ensures users verify before permanently removing a task.
3. **Zero Search Results**: When filtering yields 0 matches, a board-level banner guides the user to reset filters with one click.
4. **Overdue Indicators**: Date status calculates whether a task is overdue, due today, due tomorrow, or upcoming.
5. **Keyboard Accessibility**: Modal can be closed with the `Escape` key and auto-focuses the title field upon opening.

---