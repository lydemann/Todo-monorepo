import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import {
  createTodo,
  toggleTodoById,
  type Todo,
} from '../../../libs/shared/todo-comparison/src';

const STORAGE_KEY = 'angular-react-native-todo-comparison/v1';
const fallbackTodos: Todo[] = [
  createTodo('Compare Angular Signals with React state'),
  createTodo('Use FlatList instead of rendering a large ScrollView'),
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(fallbackTodos);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (!cancelled && value) {
          setTodos(JSON.parse(value) as Todo[]);
        }
      })
      .catch(error => {
        console.warn('Could not load local todos', error);
      })
      .finally(() => {
        if (!cancelled) setIsHydrated(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch(error => {
      console.warn('Could not persist local todos', error);
    });
  }, [isHydrated, todos]);

  const remainingCount = todos.filter(todo => !todo.completed).length;

  const addTodo = (title: string) => {
    setTodos(currentTodos => [...currentTodos, createTodo(title)]);
  };

  const toggleTodo = (id: string) => {
    setTodos(currentTodos => toggleTodoById(currentTodos, id));
  };

  const deleteTodo = (id: string) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    remainingCount,
    isHydrated,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
