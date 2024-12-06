import { Todo } from "@/types/todo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoState {
    todos: Todo[];
    addTodo: (todo: Omit<Todo, "id">) => void;
    editTodo: (id: string, updatedTodo: Partial<Todo>) => void;
    deleteTodo: (id: string) => void;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedTodo: Todo | null; // For modal
    setSelectedTodo: (todo: Todo | null) => void; // Setter for modal state
}

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            todos: [],
            selectedDate: new Date().toISOString().split("T")[0],
            selectedTodo: null,
            addTodo: (todo) =>
                set((state) => ({
                    todos: [...state.todos, { ...todo, id: Date.now().toString() }],
                })),
            editTodo: (id, updatedTodo) =>
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, ...updatedTodo } : todo
                    ),
                })),
            deleteTodo: (id) =>
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                })),
            setSelectedDate: (date) => set({ selectedDate: date }),
            setSelectedTodo: (todo) => set({ selectedTodo: todo }),
        }),
        { name: "todo-storage" }
    )
);
