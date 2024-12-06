import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTodoStore } from '@/store/useTodoStore';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const getDaysOfWeek = (date: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(date);
        day.setDate(date.getDate() - date.getDay() + i);
        days.push(day);
    }
    return days;
};

export const CalendarStrip: React.FC = () => {
    const { selectedDate, setSelectedDate } = useTodoStore();
    const currentDate = new Date(selectedDate);
    const daysOfWeek = getDaysOfWeek(currentDate);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date.toISOString().split('T')[0]);
    };

    const handleWeekChange = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        setSelectedDate(newDate.toISOString().split('T')[0]);
    };

    return (
        <div className=" flex items-center justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-10 bg-white p-4">
            <button onClick={() => handleWeekChange('prev')} className="text-gray-600">
                <ChevronLeft size={24} />
            </button>
            <ScrollArea className="w-72 sm:w-[500px] md:w-[560px] lg:w-[560px] whitespace-nowrap rounded-md">
                <div className="flex space-x-4">
                    {daysOfWeek.map((day, index) => {
                        const isSelected = day.toISOString().split('T')[0] === selectedDate;
                        return (
                            <Button
                                key={index}
                                onClick={() => handleDateChange(day)}
                                variant={isSelected ? 'default' : 'secondary'}
                                className={`h-full flex flex-col items-center border ${isSelected ? 'text-white font-bold' : 'text-muted-foreground'
                                    }`}
                            >
                                <span className="text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                <span className="text-lg font-semibold w-8 h-8 flex items-center justify-center">
                                    {day.getDate()}
                                </span>
                            </Button>
                        );
                    })}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <button onClick={() => handleWeekChange('next')} className="text-gray-600">
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

