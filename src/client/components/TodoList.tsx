import { useState, type SVGProps } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { api } from '@/utils/client/api'

export const TodoList = ({ statuses }) => {
  const apiContext = api.useContext()

  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses,
  })

  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: () => {
      apiContext.todo.getAll.refetch()
    },
  })

  const { mutate: todoStatusUpdate } = api.todoStatus.update.useMutation({
    onSuccess: () => {
      apiContext.todo.getAll.refetch()
    },
  })

  const [parent] = useAutoAnimate()

  const handleCheck = (todo) => {
    todoStatusUpdate({
      todoId: todo.id,
      status: todo.status === 'pending' ? 'completed' : 'pending',
    })
  }
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo({ id })
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  return (
    <ul ref={parent} className="grid grid-cols-1 gap-y-3">
      {todos.map((todo) => (
        <li key={todo.id}>
          <div className="flex items-center justify-between rounded-12 border border-gray-200 px-4 py-3 shadow-sm">
            <div className="flex flex-row items-center">
              <Checkbox.Root
                id={String(todo.id)}
                className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 focus:border-gray-700 focus:outline-none data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700"
                onCheckedChange={() => handleCheck(todo)}
                checked={todo.status === 'completed'}
              >
                <Checkbox.Indicator>
                  <CheckIcon className="h-4 w-4 text-white" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                className={`block pl-3 font-medium ${
                  todo.status === 'completed' && 'text-[#64748B] line-through'
                }`}
                htmlFor={String(todo.id)}
              >
                {todo.body}
              </label>
            </div>
            <button onClick={() => handleDelete(todo.id)}>
              <XMarkIcon className="w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}
