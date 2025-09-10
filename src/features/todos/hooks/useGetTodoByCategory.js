import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTodosByCategory } from "../../../services/todos/apiTodos";

export default function useGetTodoByCategory() {
  const { categoryName } = useParams();
  console.log(categoryName)
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos", categoryName],
    queryFn: () => getTodosByCategory(categoryName),
    enabled: !!categoryName, // only run if categoryName exists
  });

  console.log(todos);

  return { todos, isLoading, error };
}
