import Link from "next/link";
import { TodoList } from "@prisma/client";
import { UserResponse } from "@supabase/supabase-js";
import classes from "./page.module.css";
import { createClient } from "@/utils/supabase/server";
import { fetchTodoListsByUserId } from "@/database/todos";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient()
  const userReponse: UserResponse = await supabase.auth.getUser()
  const user = userReponse.data.user;
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <h1>Welcome {user.email}</h1>
      <Link href="/todo-list">New Todo List</Link>
    </>
  )
  // const todoLists: TodoList[] = await fetchTodoListsByUserId(user.id);

  // return (
  //   <main className={classes.wrapper}>
  //     <Link href="/todo-list">New Todo List</Link>
  //     <h3>Todo Lists</h3>
  //     { todoLists.length === 0 ? <p>No todo lists found</p> : 
  //       <section className={classes.todoListSection}>
  //         {
  //           todoLists.map((todoList) => (
  //             <Link href={`/todo-list/${todoList.id}`} key={todoList.id}>{todoList.list_name}</Link> 
  //           ))
  //         }
  //       </section>
  //     }
  //   </main>
  // );
}
