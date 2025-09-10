import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo as addTodoApi } from "../../../services/todos/apiTodos";

export function useAddTodo() {
  const queryClient = useQueryClient();

  const {
    mutate: addTodo,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      // ✅ Invalidate and refetch todos after adding one
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      console.error("❌ Error adding todo:", error);
    },
  });

  return { addTodo, isLoading, isError };
}
