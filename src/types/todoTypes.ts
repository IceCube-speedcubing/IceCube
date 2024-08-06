export type TodoStatus = "Not Started" | "In Progress" | "Completed";
export type TodoPriority = "Low" | "Medium" | "High";

export interface Todo {
  id: string;
  task: string;
  assignedTo: string;
  status: TodoStatus;
  priority: TodoPriority;
}

export interface TodoFormData {
  task: string;
  assignedTo: string;
  priority: TodoPriority;
}
