import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { useTodoStore } from "@/store/useTodoStore";
import { Todo, Priority, Status } from "@/types/todo"; // Assuming Priority and Status are defined here
import { useEffect, useState } from "react";

export const EditTodoModal: React.FC = () => {
    const { selectedTodo, setSelectedTodo, editTodo } = useTodoStore();
    const [editedTodo, setEditedTodo] = useState<Todo | null>(selectedTodo);

    const handleSave = () => {
        if (editedTodo) {
            editTodo(editedTodo.id, editedTodo);
            setSelectedTodo(null); // Close modal
        }
    };

    const handleClose = () => {
        setSelectedTodo(null); // Close modal
    };

    useEffect(() => {
        setEditedTodo(selectedTodo); // Sync modal state with store
    }, [selectedTodo]);

    if (!selectedTodo) return null;

    return (
        <Modal isOpen={!!selectedTodo} onClose={handleClose}>
            <h2 className="text-xl font-bold">Edit Task</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    value={editedTodo?.title || ""}
                    onChange={(e) =>
                        setEditedTodo((prev) =>
                            prev ? { ...prev, title: e.target.value } : null
                        )
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Task Title"
                />
                <select
                    value={editedTodo?.priority || "Low"}
                    onChange={(e) =>
                        setEditedTodo((prev) =>
                            prev ? { ...prev, priority: e.target.value as Priority } : null
                        )
                    }
                    className="w-full p-2 border rounded"
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select
                    value={editedTodo?.status || "Pending"}
                    onChange={(e) =>
                        setEditedTodo((prev) =>
                            prev ? { ...prev, status: e.target.value as Status } : null
                        )
                    }
                    className="w-full p-2 border rounded"
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </Modal>
    );
};