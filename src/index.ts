#!/usr/bin/env node
import process from 'node:process';
import fs from "node:fs";
import path from "node:path";

const FILE_PATH = path.join(process.cwd(), "todos.json");

// Reads tasks from disk into RAM
function loadTasks(): Task[] {
  if (!fs.existsSync(FILE_PATH)) {
    return []; // If file doesn't exist yet, start with an empty array
  }
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data); // Reconstructs array from JSON string
}

// Saves tasks from RAM back to disk
function saveTasks(tasks: Task[]): void {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

type Status = "todo" | "doing" | "done";

interface Task {
  id: number;
  title: string;
  status: Status;
}

// In-memory list seeded with two sample tasks
const tasks = loadTasks();

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "list": {
        console.log("\nTODO");
        console.log("-------");
        tasks.filter(t => t.status === "todo").forEach(t => console.log(`${t.id}. ${t.title}`));

        console.log("\nDOING");
        console.log("--------");
        tasks.filter(t => t.status === "doing").forEach(t => console.log(`${t.id}. ${t.title}`));

        console.log("\nDONE");
        console.log("-------");
        tasks.filter(t => t.status === "done").forEach(t => console.log(`${t.id}. ${t.title}`));
        break;
    }

    case "add": {
        const title = args[1];

        if (!title) {
            console.log("Error: Please provide a task title.");
            console.log('Usage: todo add "Task title"');
            break;
        }

        const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
        const newTaskId = maxId + 1;

        tasks.push({
            id: newTaskId,
            title,
            status: "todo"
        });

        saveTasks(tasks);

        console.log(`Added task #${newTaskId}: "${title}"`);
        break;
    }

    case "doing":{
        const id = Number(args[1]);

        if (!id || Number.isNaN(id)) {
            console.log("Error: Provide a valid task ID");
            console.log("Usage: todo doing <id>");
            break;
        }

        const task = tasks.find(t => t.id === id);

        if (!task) {
            console.log(`Error: Task #${id} not found.`);
            break;
        }

        task.status="doing";
        saveTasks(tasks);
        console.log(`Marked task #${id} ("${task.title}") as Doing.`);
        break;
    }

    case "done": {
        const id = Number(args[1]);

        if (!id || Number.isNaN(id)) {
            console.log("Error: Please provide a valid task ID.");
            console.log("Usage: todo done <id>");
            break;
        }

        const task = tasks.find(t => t.id === id);

        if (!task) {
            console.log(`Error: Task #${id} not found.`);
            break;
        }

        task.status = "done";
        saveTasks(tasks);
        console.log(`Marked task #${id} ("${task.title}") as DONE.`);
        break;
    }

    case "remove": {
        const id = Number(args[1]);

        if (!id || Number.isNaN(id)) {
            console.log("Error: Provide a valid task ID");
            console.log("Usage: todo remove <id>");
            break;
        }

        const taskExists = tasks.some(t => t.id === id);

        if (!taskExists) {
            console.log(`Error: Task #${id} not found.`);
            break;
        }

        // Keep every task EXCEPT the one matching the given ID
        const updatedTasks = tasks.filter(t => t.id !== id);

        saveTasks(updatedTasks);
        console.log(`Removed task #${id}.`);
        break;
    }

    default:
        console.log("Usage: TODO list");
        break;
}