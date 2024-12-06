"use client"
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTodoStore } from '@/store/useTodoStore';
import { Color, Priority, Status } from '@/types/todo';

interface AddTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [currentPriority, setCurrentPriority] = useState<Priority>('Low');
    const [currentColor, setCurrentColor] = useState<Color>('#3AA86D');
    const [currentStatus, setCurrentStatus] = useState<Status>('Pending');
    const [error, setError] = useState<string | null>(null);

    const { addTodo, selectedDate } = useTodoStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Title cannot be empty.');
            return;
        }

        addTodo({
            title: title.trim(),
            status: currentStatus,
            priority: currentPriority,
            color: currentColor,
            date: selectedDate,
            time: new Date().toLocaleTimeString(),
        });

        // Reset form state
        setTitle('');
        setCurrentPriority('Low');
        setCurrentColor('#3AA86D');
        setCurrentStatus('Pending');
        setError(null);

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Task</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="w-full p-2 border rounded mb-4 focus:outline-blue-500"
                        autoFocus
                    />
                    {error && (
                        <p className="text-red-500 text-sm mb-2">{error}</p>
                    )}
                    <div className="mb-4">
                        <label htmlFor="priority" className="block text-sm font-medium mb-1">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={currentPriority}
                            onChange={(e) =>
                                setCurrentPriority(e.target.value as Priority)
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            value={currentStatus}
                            onChange={(e) =>
                                setCurrentStatus(e.target.value as Status)
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="color" className="block text-sm font-medium mb-1">
                            Color
                        </label>
                        <select
                            id="color"
                            value={currentColor}
                            onChange={(e) => setCurrentColor(e.target.value as Color)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="#6933FF">Purple</option>
                            <option value="#FAB005">Orange</option>
                            <option value="#F9F871">Yellow</option>
                            <option value="#3AA86D">Green</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};
