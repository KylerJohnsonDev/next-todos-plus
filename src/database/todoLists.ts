import { TodoList } from "@prisma/client";
import prisma from "./db";

export function createTodoList(
  userId: string,
  list_name: string,
  description: string
): Promise<TodoList> {
  return prisma.todoList.create({
    data: {
      list_name,
      list_description: description,
      userId,
    },
  });
}

export function fetchTodoListByListId(listId: number) {
  return prisma.todoList.findUnique({
    where: {
      id: listId,
    },
    include: {
      todos: true,
    },
  });
}
