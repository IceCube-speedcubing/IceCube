import React from "react";
import { Todo, TodoStatus } from "@/types/todoTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  onUpdateStatus: (id: string, status: TodoStatus) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdateStatus,
  onDeleteTodo,
  onEditTodo,
}) => {
  const getStatusColor = (status: TodoStatus): string => {
    const colors = {
      "Not Started": "bg-red-500",
      "In Progress": "bg-yellow-500",
      Completed: "bg-green-500",
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Todo["priority"]): string => {
    const colors: Record<Todo["priority"], string> = {
      Low: "text-blue-400",
      Medium: "text-yellow-400",
      High: "text-red-400",
    };
    return colors[priority];
  };

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold text-lg">
              {todo.task}
            </span>
            <div className="flex space-x-2">
              <Badge className={getStatusColor(todo.status)}>
                {todo.status}
              </Badge>
              <Badge className={getPriorityColor(todo.priority)}>
                {todo.priority}
              </Badge>
            </div>
          </div>
          <p className="text-gray-300 mt-2">Assigned to: {todo.assignedTo}</p>
          <div className="mt-4 flex justify-between items-center">
            <select
              value={todo.status}
              onChange={(e) =>
                onUpdateStatus(todo.id, e.target.value as TodoStatus)
              }
              className="bg-gray-700 text-white rounded p-2"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="space-x-2">
              <Button
                onClick={() => onEditTodo(todo)}
                variant="outline"
                size="sm"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={() => onDeleteTodo(todo.id)}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
