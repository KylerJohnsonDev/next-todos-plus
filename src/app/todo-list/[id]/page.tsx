import { fetchTodoListByListId } from "@/database/todoLists"


export default async function TodoListDetailPage({params}: {params: { id: string}}) {

  const todoList = await fetchTodoListByListId(Number(params.id))

  if(!todoList) { 
    return <p>Todo List not found</p>
  }

  return (
    <>
      <h3>Todo List Detail</h3>
      <p>List Name: {todoList.list_name}</p>
    </>
  )
}