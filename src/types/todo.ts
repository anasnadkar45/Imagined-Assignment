export type Priority = 'High' | 'Low' | 'Medium'
export type Status = 'Pending' | 'In progress' | 'Completed'
export type Color = '#6933FF' | '#FAB005' | '#F9F871' | '#3AA86D'

export interface Todo {
  id: string
  title: string
  priority: Priority
  status: Status
  date: string
  time: string
  color: string
}

