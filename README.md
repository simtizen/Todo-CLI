# Todo CLI

A lightweight, persistent command-line task manager built with **Node.js**, **TypeScript**, and **`tsx`**. Data is persisted locally on disk using a `todos.json` file.

## 🚀 Features

* **Add Tasks**: Create new task items with automatic ID assignment.
* **Track Status**: Move tasks across `TODO`, `DOING`, and `DONE` states.
* **Delete Tasks**: Remove items safely by ID.
* **Disk Persistence**: Tasks auto-save locally to `todos.json` using the Read-Modify-Write cycle.
* **Clean CLI Experience**: Run commands directly in your terminal using `npm link`.

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/todo-cli.git
   cd todo-cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Link command globally:**
   ```bash
   npm link
   ```

Now you can run the `todo` command directly from anywhere in your terminal!

---

## 📋 Usage & Commands

| Command | Usage | Description |
| :--- | :--- | :--- |
| **List** | `todo list` | Display all tasks organized by status |
| **Add** | `todo add "Task title"` | Create a new task in `todo` status |
| **Doing** | `todo doing <id>` | Move a task to `doing` status |
| **Done** | `todo done <id>` | Mark a task as completed (`done`) |
| **Remove** | `todo remove <id>` | Delete a task from your list |

---

## 💡 Examples

```bash
# Add a task
todo add "Review Physics Notes"

# Move task #1 to DOING
todo doing 1

# Complete task #1
todo done 1

# Delete task #2
todo remove 2

# View current task status
todo list
```

---

## 📂 Project Architecture

```text
todo-cli/
├── src/
│   └── index.ts     # Core CLI logic & JSON helper functions
├── todos.json       # Persistent JSON database (auto-generated)
├── package.json     # Bin configuration & scripts
└── tsconfig.json    # TypeScript compiler configuration
```