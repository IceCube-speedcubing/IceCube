import React, { useState, useEffect } from "react";
import { Todo, TodoFormData, TodoPriority } from "@/types/todoTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TodoFormProps {
  onAddTodo: (todo: TodoFormData) => void;
  editingTodo: Todo | null;
  onUpdateTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onAddTodo,
  editingTodo,
  onUpdateTodo,
}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    task: "",
    assignedTo: "",
    priority: "Medium",
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        task: editingTodo.task,
        assignedTo: editingTodo.assignedTo,
        priority: editingTodo.priority,
      });
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTodo) {
      onUpdateTodo({ ...editingTodo, ...formData });
    } else {
      onAddTodo(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ task: "", assignedTo: "", priority: "Medium" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={formData.task}
        onChange={(e) => setFormData({ ...formData, task: e.target.value })}
        placeholder="Enter a new task"
        className="bg-white bg-opacity-20 text-white placeholder-gray-300"
      />
      <Input
        type="text"
        value={formData.assignedTo}
        onChange={(e) =>
          setFormData({ ...formData, assignedTo: e.target.value })
        }
        placeholder="Assign to"
        className="bg-white bg-opacity-20 text-white placeholder-gray-300"
      />
      <Select
        onValueChange={(value) =>
          setFormData({ ...formData, priority: value as TodoPriority })
        }
        value={formData.priority}
      >
        <SelectTrigger className="bg-white bg-opacity-20 text-white">
          <SelectValue placeholder="Set priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 w-full">
        {editingTodo ? "Update Task" : "Add Task"}
      </Button>
    </form>
  );
};

export default TodoForm;
