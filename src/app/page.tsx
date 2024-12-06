"use client"
import { useTodoStore } from '@/store/useTodoStore'
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { AddTodoModal } from './components/AddTodoModal';
import { CalendarStrip } from './components/CalendarStrip';
import { TodoCard } from './components/TodoCard';
import { Button } from '@/components/ui/button';
import { EditTodoModal } from './components/EditTodoModel';

const Home = () => {
  const { todos, selectedDate } = useTodoStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  const handleAddTodo = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-white border-b-2">
        <div className='max-w-6xl mx-auto p-4 flex justify-between items-center'>
          <h1 className="text-2xl font-semibold">Task List</h1>
          <Button
            size={'icon'}
            onClick={handleAddTodo}
            className="bg-primary text-white rounded-full"
          >
            <Plus size={24} />
          </Button>
        </div>
      </header>
      <CalendarStrip />
      <main className="max-w-6xl mx-auto p-4">
        {filteredTodos.length > 0 ? (
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="relative">
                <div className="absolute left-0 -translate-x-1/2 top-0 h-full">
                  <div className="h-full w-px bg-gray-400 relative">
                    <div className="absolute top-6 left-1/2 w-2 h-2 bg-gray-700 rounded-full -translate-x-1/2" />
                  </div>
                </div>
                <div className="pl-8">
                  <div className="text-sm text-muted-foreground mb-2">{todo.time}</div>
                  <TodoCard todo={todo} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-6 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Todos for today</h3>
            <p className="text-gray-500 mb-4">Get started by adding a new todo</p>
            <Button onClick={handleAddTodo} className="bg-primary text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Todo
            </Button>
          </div>
        )}
      </main>
      <AddTodoModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditTodoModal />
    </div>
  )
}

export default Home

