"use client";

import React, { useState, useEffect } from "react";
import TodoForm from "@/components/admin/TodoForm";
import TodoList from "@/components/admin/TodoList";
import AdminCheck from "@/components/admin/AdminCheck";
import { Background } from "@/components/Background";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Todo,
  TodoStatus,
  TodoPriority,
  TodoFormData,
} from "@/types/todoTypes";

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<TodoStatus | "All">("All");
  const [filterPriority, setFilterPriority] = useState<TodoPriority | "All">(
    "All"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (newTodo: TodoFormData) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      await fetch(`/api/todos/${updatedTodo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateStatus = async (id: string, status: TodoStatus) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      await updateTodo({ ...todoToUpdate, status });
    }
  };

  const filteredTodos = todos.filter(
    (todo) =>
      (filterStatus === "All" || todo.status === filterStatus) &&
      (filterPriority === "All" || todo.priority === filterPriority) &&
      todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminCheck>
      <Background />
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Advanced Admin Todo List
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {editingTodo ? "Edit Task" : "Add New Task"}
            </h2>
            <TodoForm
              onAddTodo={addTodo}
              editingTodo={editingTodo}
              onUpdateTodo={updateTodo}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Current Tasks
            </h2>
            <div className="mb-4 flex space-x-2">
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white bg-opacity-20 text-white placeholder-gray-300"
              />
              <Select
                onValueChange={(value) =>
                  setFilterStatus(value as TodoStatus | "All")
                }
                value={filterStatus}
              >
                <SelectTrigger className="bg-white bg-opacity-20 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) =>
                  setFilterPriority(value as TodoPriority | "All")
                }
                value={filterPriority}
              >
                <SelectTrigger className="bg-white bg-opacity-20 text-white">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priorities</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TodoList
              todos={filteredTodos}
              onUpdateStatus={updateStatus}
              onDeleteTodo={deleteTodo}
              onEditTodo={setEditingTodo}
            />
          </div>
        </div>
      </div>
    </AdminCheck>
  );
};

export default TodoPage;
