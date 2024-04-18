import { Todo, TodoList } from "@prisma/client";
import prisma from "./db";

export async function fetchTodoListsByUserId(
  userId: string
): Promise<TodoList[]> {
  return prisma.todoList.findMany({
    where: {
      userId,
    },
  });
}

// export function createTodo(userId: string, text: string): Promise<Todo> {
//   return prisma.todo.create({
//     data: {
//       text,
//       userId,
//     },
//   });
// }

export function addNewTodoToList(listId: number, text: string): Promise<Todo> {
  return prisma.todo.create({
    data: {
      text,
      todoListId: listId,
    },
  });
}

export function updateTodoById(id: number, isComplete: boolean): Promise<Todo> {
  return prisma.todo.update({
    where: {
      id,
    },
    data: {
      isComplete,
    },
  });
}

export function deleteTodoById(id: number): Promise<Todo> {
  return prisma.todo.delete({
    where: {
      id,
    },
  });
}
