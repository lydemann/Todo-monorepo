import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Todo } from '../../../libs/shared/todo-comparison/src';

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export function TodoRow({ todo, onToggle, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.completed }}
        accessibilityLabel={todo.title}
        hitSlop={8}
        onPress={onToggle}
        style={({ pressed }) => [styles.todoButton, pressed && styles.pressed]}
      >
        <View style={[styles.checkbox, todo.completed && styles.checkboxChecked]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.todoTitle, todo.completed && styles.todoTitleCompleted]}>
          {todo.title}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Delete ${todo.title}`}
        hitSlop={8}
        onPress={onDelete}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  todoButton: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 44,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#94a3b8',
    borderRadius: 7,
    borderWidth: 2,
    height: 26,
    width: 26,
  },
  checkboxChecked: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
  todoTitle: {
    color: '#0f172a',
    flex: 1,
    fontSize: 16,
  },
  todoTitleCompleted: {
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    justifyContent: 'center',
    minHeight: 44,
  },
  deleteText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.65,
  },
});
