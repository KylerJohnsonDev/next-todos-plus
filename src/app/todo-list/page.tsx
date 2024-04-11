import { redirect } from 'next/navigation';
import classes from './NewTodoList.module.css';
import { auth } from '@clerk/nextjs';
import { createTodoList } from '@/database/todoLists';

export default function NewTodoList() {
  const { userId } = auth();
  if (userId === null) {
    redirect("/sign-in");
  }

  async function handleFormSubmission(formData: FormData) {
    'use server'
    const list_name = formData.get('list_name') as string;
    const description = formData.get('description') as string;
    const todoList = await createTodoList(userId as string, list_name, description);
    if(todoList) {
      redirect(`/todo-list/${todoList.id}`);
    }
  }

  return (
    <>
      <h3>Create New Todo List</h3>

      <form className={classes.createTodoListForm} action={handleFormSubmission}>
        <div className={classes.formItem}>
          <label htmlFor="list_name">List Name</label>
          <input type="text" id="list_name" name="list_name" />
        </div>
        <div className={classes.formItem}>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}