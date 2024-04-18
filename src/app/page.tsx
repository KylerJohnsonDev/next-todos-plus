import { redirect } from "next/navigation";
import classes from "./page.module.css";
import { TodoList } from "@prisma/client";
import { fetchTodoListsByUserId } from "@/database/todos";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  if (userId === null) {
    redirect("/sign-in");
  }
  const todoLists: TodoList[] = await fetchTodoListsByUserId(userId);

  return (
    <main className={classes.wrapper}>
      <Link href="/todo-list">New Todo List</Link>
      <h3>Todo Lists</h3>
      { todoLists.length === 0 ? <p>No todo lists found</p> : 
        <section className={classes.todoListSection}>
          {
            todoLists.map((todoList) => (
              <Link href={`/todo-list/${todoList.id}`} key={todoList.id}>{todoList.list_name}</Link> 
            ))
          }
        </section>
      }
    </main>
  );
}
