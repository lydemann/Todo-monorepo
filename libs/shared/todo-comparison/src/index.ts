export type Todo = Readonly<{
  id: string;
  title: string;
  completed: boolean;
}>;

export function createTodo(title: string): Todo {
  return {
    id: createId(),
    title,
    completed: false,
  };
}

export function toggleTodoById(todos: readonly Todo[], id: string): Todo[] {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
