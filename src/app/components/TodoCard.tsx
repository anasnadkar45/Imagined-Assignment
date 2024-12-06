import { useTodoStore } from "@/store/useTodoStore";
import { Todo } from "@/types/todo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Pen, Trash } from "lucide-react";

interface TodoCardProps {
    todo: Todo;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
    const { setSelectedTodo, deleteTodo } = useTodoStore();

    const handleEdit = () => {
        setSelectedTodo(todo);
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTodo(todo.id);
        }
    };

    return (
        <div
            className="relative pl-4 pr-2 py-3 bg-white rounded-lg shadow-sm border"
            style={{ borderLeft: `10px solid ${todo.color}` }}
        >
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h3 className="font-medium">{todo.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{new Date(todo.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                        <Badge
                            variant="secondary"
                            className={`rounded-full text-sm ${todo.priority === 'High'
                                ? 'bg-red-100 text-red-600'
                                : todo.priority === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-green-100 text-green-600'
                                }`}
                        >
                            {todo.priority}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className={`rounded-full text-sm ${todo.status === 'Completed'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {todo.status}
                        </Badge>
                    </div>
                </div>
                <div className="flex items-center gap-2 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="ghost" size="icon" onClick={handleEdit} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                        <Pen size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
