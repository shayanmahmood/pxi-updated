import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../../services/todos/apiTodos";

function extractCategories(todos) {
  const categories = new Set();

  todos?.forEach((todo) => {
    if (todo.category) {
      categories.add(todo.category);
    }
  });

  // Convert Set → array of objects
  return Array.from(categories).map((cat) => ({
    name: cat,
    layout: "/admin",
    path: `brain-dumping/${cat}`,
  }));
}

export function useTodos() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryFn: getTodos,
    queryKey: ["todos"],
  });

  const todoLinks = extractCategories(todos);

  return { todos, isLoading, error, todoLinks };
}
