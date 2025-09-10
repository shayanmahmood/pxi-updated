import useGetTodoByCategory from "../../../../features/todos/hooks/useGetTodoByCategory";
import React from "react";

export default function BrainDumpingCategory() {
  const { todos, isLoading, error } = useGetTodoByCategory();

  if (isLoading) return <p>Loading..</p>;

  console.log(todos);
  return (
    <div>
      {todos?.map((todo) => (
        <p key={todo.title}>{todo.title}</p>
      ))}
    </div>
  );
}
