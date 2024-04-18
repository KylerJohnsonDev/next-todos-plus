import { fetchTodoListByListId } from "@/database/todoLists"
import { addNewTodoToList } from "@/database/todos";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function TodoListDetailPage({params}: {params: { id: string}}) {

  const { userId } = auth();
  if (userId === null) {
    redirect("/sign-in");
  }

  const listId = Number(params.id);
  const todoList = await fetchTodoListByListId(listId)

  async function addTodo(formData: FormData): void {
    'use server'
    const todoText = formData.get('todoText') as string;
    await addNewTodoToList(listId, todoText);
    revalidatePath(`/todo-list/${listId}`);
  }

  if(!todoList) { 
    return <p>Todo List not found</p>
  }

  return (
    <>
      <h3>Todo List Detail</h3>
      <p>List Name: {todoList.list_name}</p>

      <section>
        <h3>Todos</h3>
        <div>
          { todoList.todos.length === 0 ? <p>No todos have been added.</p> : 
            <section>
              {
                todoList.todos.map((todo) => (
                  <p key={todo.id}>{todo.text}</p>
                ))
              }
            </section>
          }
        </div>
        <form action={addTodo}>
          <input type="text" name="todoText" />
          <button type="submit">Add Todo</button>
        </form>
      </section>
    </>
  )
}